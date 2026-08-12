"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { guarded } from "@/lib/auth-guards";
import { recordAudit } from "@/lib/audit";
import { snapshotVersion } from "@/lib/content-versions";

const TEMPLATE_KEYS = [
  "FIRST_REPLY",
  "FOLLOW_UP",
  "DEMO_LINK",
  "CONSULTING_REPLY",
  "CUSTOM",
];

function readTemplateForm(formData) {
  const get = (key) => String(formData.get(key) || "").trim();

  const data = {
    name: get("name"),
    templateKey: TEMPLATE_KEYS.includes(get("templateKey")) ? get("templateKey") : "CUSTOM",
    subjectDe: get("subjectDe"),
    subjectEn: get("subjectEn"),
    bodyDe: get("bodyDe"),
    bodyEn: get("bodyEn"),
    status: get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
  };

  const missing = ["name", "subjectDe", "subjectEn", "bodyDe", "bodyEn"].filter(
    (field) => !data[field],
  );

  if (missing.length) {
    throw new Error(
      "Both German and English versions are required before saving a template.",
    );
  }

  return data;
}

export async function listEmailTemplates() {
  return prisma.emailTemplate.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
}

export async function getEmailTemplate(id) {
  return prisma.emailTemplate.findUnique({ where: { id } });
}

export async function saveEmailTemplate(prevState, formData) {
  return guarded(async (session) => {
    const id = String(formData.get("id") || "").trim();
    const data = readTemplateForm(formData);

    const template = id
      ? await prisma.emailTemplate.update({ where: { id }, data })
      : await prisma.emailTemplate.create({ data });

    await snapshotVersion({
      entityType: "EmailTemplate",
      entityId: template.id,
      payload: data,
      changeNote: id ? "Updated" : "Created",
      session,
    });

    await recordAudit({
      session,
      action: id ? "UPDATE" : "CREATE",
      entityType: "EmailTemplate",
      entityId: template.id,
      entityLabel: template.name,
      next: { status: template.status },
    });

    revalidatePath("/dashboard/email-templates");

    return { id: template.id, msg: id ? "Template updated" : "Template created" };
  }, { admin: true });
}

export async function deleteEmailTemplate(id) {
  return guarded(async (session) => {
    const template = await prisma.emailTemplate.findUnique({ where: { id } });
    if (!template) throw new Error("That template no longer exists.");

    await prisma.emailTemplate.delete({ where: { id } });

    await recordAudit({
      session,
      action: "DELETE",
      entityType: "EmailTemplate",
      entityId: id,
      entityLabel: template.name,
    });

    revalidatePath("/dashboard/email-templates");
    return { msg: "Template deleted" };
  }, { admin: true });
}
