"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { guarded } from "@/lib/auth-guards";
import { recordAudit } from "@/lib/audit";
import { sendLeadMessage } from "@/lib/email";
import { renderTemplate } from "@/lib/email-templates";

const LEAD_STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST", "CLOSED"];

export async function listLeads({
  search = "",
  status = "",
  type = "",
  take = 50,
  skip = 0,
} = {}) {
  const where = {};

  if (status && LEAD_STATUSES.includes(status)) where.status = status;
  if (type) where.type = type;

  if (search) {
    where.OR = [
      { email: { contains: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
    ];
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take,
      skip,
      include: { _count: { select: { messages: true } } },
    }),
    prisma.lead.count({ where }),
  ]);

  return { leads, total };
}

export async function getLead(id) {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        include: { sender: { select: { id: true, name: true, email: true } } },
      },
      tasks: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function updateLeadStatus(id, status) {
  return guarded(async (session) => {
    if (!LEAD_STATUSES.includes(status)) {
      throw new Error("That is not a valid lead status.");
    }

    const previous = await prisma.lead.findUnique({
      where: { id },
      select: { status: true, email: true },
    });

    if (!previous) throw new Error("That lead no longer exists.");

    await prisma.lead.update({
      where: { id },
      data: { status, lastActivityAt: new Date() },
    });

    await recordAudit({
      session,
      action: "UPDATE",
      entityType: "Lead",
      entityId: id,
      entityLabel: previous.email,
      previous: { status: previous.status },
      next: { status },
    });

    revalidatePath("/dashboard/leads");
    revalidatePath(`/dashboard/leads/${id}`);

    return { status };
  });
}

export async function updateLeadNotes(id, { internalNotes, tags }) {
  return guarded(async (session) => {
    const parsedTags = String(tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 20);

    await prisma.lead.update({
      where: { id },
      data: {
        internalNotes: internalNotes?.trim() || null,
        tags: parsedTags,
        lastActivityAt: new Date(),
      },
    });

    await recordAudit({
      session,
      action: "UPDATE",
      entityType: "Lead",
      entityId: id,
      entityLabel: "notes",
    });

    revalidatePath(`/dashboard/leads/${id}`);
    return { tags: parsedTags };
  });
}

/** C3 — compose and send an email to a lead, stored in the lead history. */
export async function sendMessageToLead(leadId, formData) {
  return guarded(async (session) => {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new Error("That lead no longer exists.");

    const subject = String(formData.get("subject") || "").trim();
    const body = String(formData.get("body") || "").trim();
    const locale = formData.get("locale") === "en" ? "en" : "de";
    const templateId = formData.get("templateId") || null;

    if (!subject) throw new Error("Add a subject before sending.");
    if (!body) throw new Error("Add a message before sending.");

    // Store first, send second, so a transport failure still leaves a record
    // the user can see and retry.
    const message = await prisma.leadMessage.create({
      data: {
        leadId,
        direction: "OUTBOUND",
        status: "QUEUED",
        subject,
        bodyText: body,
        bodyHtml: body.replace(/\n/g, "<br />"),
        locale,
        templateId: templateId || null,
        toAddress: lead.email,
        senderId: session.user.id,
      },
    });

    try {
      const info = await sendLeadMessage({
        to: lead.email,
        subject,
        text: body,
        html: body.replace(/\n/g, "<br />"),
      });

      await prisma.leadMessage.update({
        where: { id: message.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
          fromAddress: info?.from || null,
          errorText: null,
        },
      });

      await prisma.lead.update({
        where: { id: leadId },
        data: {
          lastActivityAt: new Date(),
          status: lead.status === "NEW" ? "CONTACTED" : lead.status,
        },
      });
    } catch (error) {
      await prisma.leadMessage.update({
        where: { id: message.id },
        data: {
          status: "FAILED",
          errorText: String(error?.message || error).slice(0, 1000),
        },
      });

      throw new Error(
        "The message was saved but could not be sent. Check the mail settings and retry.",
      );
    }

    await recordAudit({
      session,
      action: "CREATE",
      entityType: "LeadMessage",
      entityId: message.id,
      entityLabel: `${lead.email} — ${subject}`,
    });

    revalidatePath(`/dashboard/leads/${leadId}`);
    revalidatePath("/dashboard/messages");

    return { messageId: message.id };
  });
}

/** Fills a template for a given lead so the editor can tweak before sending. */
export async function previewTemplateForLead(leadId, templateId, locale = "de") {
  const [lead, template] = await Promise.all([
    prisma.lead.findUnique({ where: { id: leadId } }),
    prisma.emailTemplate.findUnique({ where: { id: templateId } }),
  ]);

  if (!lead || !template) return { success: false, msg: "Template not found." };

  return {
    success: true,
    ...renderTemplate(template, lead, locale),
  };
}

export async function exportLeadsCsv(filters = {}) {
  return guarded(async (session) => {
    const { leads } = await listLeads({ ...filters, take: 5000 });

    const header = [
      "Created",
      "Type",
      "Status",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Locale",
      "Consent",
      "UTM source",
      "UTM medium",
      "UTM campaign",
      "Landing page",
      "Message",
    ];

    const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = leads.map((lead) =>
      [
        lead.createdAt.toISOString(),
        lead.type,
        lead.status,
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.locale,
        lead.consentGiven ? "yes" : "no",
        lead.utmSource,
        lead.utmMedium,
        lead.utmCampaign,
        lead.landingPage,
        lead.message,
      ]
        .map(escape)
        .join(","),
    );

    await recordAudit({
      session,
      action: "EXPORT",
      entityType: "Lead",
      entityLabel: `${leads.length} leads`,
    });

    return { csv: [header.map(escape).join(","), ...rows].join("\n"), count: leads.length };
  });
}
