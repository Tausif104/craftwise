"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { guarded } from "@/lib/auth-guards";
import { recordAudit } from "@/lib/audit";
import { snapshotVersion } from "@/lib/content-versions";

/**
 * CRUD for the CMS-managed marketing content (B1, B2, B3).
 *
 * Every write snapshots the previous state into ContentVersion first, so A3's
 * "previous version can be restored" holds for all three content types.
 */

const str = (formData, key) => String(formData.get(key) || "").trim();
const num = (formData, key) => Number(formData.get(key) || 0);
const bool = (formData, key) => formData.get(key) === "on" || formData.get(key) === "true";

function revalidatePublic(paths = []) {
  ["/dashboard", ...paths].forEach((path) => revalidatePath(path));
}

/* --------------------------------- pricing -------------------------------- */

export async function savePricingPlan(prevState, formData) {
  return guarded(async (session) => {
    const id = str(formData, "id");

    const data = {
      planKey: str(formData, "planKey"),
      nameDe: str(formData, "nameDe"),
      nameEn: str(formData, "nameEn"),
      descriptionDe: str(formData, "descriptionDe") || null,
      descriptionEn: str(formData, "descriptionEn") || null,
      monthlyPrice: num(formData, "monthlyPrice"),
      annualPrice: num(formData, "annualPrice"),
      ctaLabelDe: str(formData, "ctaLabelDe") || null,
      ctaLabelEn: str(formData, "ctaLabelEn") || null,
      ctaHref: str(formData, "ctaHref") || null,
      isPopular: bool(formData, "isPopular"),
      sortOrder: num(formData, "sortOrder"),
      status: str(formData, "status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    };

    if (!data.planKey || !data.nameDe || !data.nameEn) {
      throw new Error("A plan needs a key and both German and English names.");
    }

    if (data.status === "PUBLISHED") data.publishedAt = new Date();

    const features = JSON.parse(str(formData, "features") || "[]");

    let plan;

    if (id) {
      const before = await prisma.pricingPlan.findUnique({
        where: { id },
        include: { features: true },
      });

      await snapshotVersion({
        entityType: "PricingPlan",
        entityId: id,
        payload: before,
        changeNote: "Before edit",
        session,
      });

      plan = await prisma.pricingPlan.update({ where: { id }, data });

      // Features are a small ordered list; replacing them is simpler and safer
      // than diffing, and the previous set is already snapshotted above.
      await prisma.planFeature.deleteMany({ where: { planId: id } });
    } else {
      plan = await prisma.pricingPlan.create({ data });
    }

    if (features.length) {
      await prisma.planFeature.createMany({
        data: features
          .filter((feature) => feature.labelDe || feature.labelEn)
          .map((feature, index) => ({
            planId: plan.id,
            labelDe: feature.labelDe || feature.labelEn,
            labelEn: feature.labelEn || feature.labelDe,
            sortOrder: index,
          })),
      });
    }

    await recordAudit({
      session,
      action: id ? "UPDATE" : "CREATE",
      entityType: "PricingPlan",
      entityId: plan.id,
      entityLabel: plan.nameEn,
      next: { status: plan.status, monthlyPrice: String(plan.monthlyPrice) },
    });

    revalidatePublic(["/pricing", "/en/pricing", "/preise"]);

    return { id: plan.id, msg: id ? "Plan updated" : "Plan created" };
  }, { admin: true });
}

export async function deletePricingPlan(id) {
  return guarded(async (session) => {
    const plan = await prisma.pricingPlan.findUnique({ where: { id } });
    if (!plan) throw new Error("That plan no longer exists.");

    await prisma.pricingPlan.delete({ where: { id } });

    await recordAudit({
      session,
      action: "DELETE",
      entityType: "PricingPlan",
      entityId: id,
      entityLabel: plan.nameEn,
    });

    revalidatePublic(["/pricing", "/en/pricing", "/preise"]);
    return { msg: "Plan deleted" };
  }, { admin: true });
}

/* ------------------------------- testimonials ------------------------------ */

export async function saveTestimonial(prevState, formData) {
  return guarded(async (session) => {
    const id = str(formData, "id");
    const pageKeys = JSON.parse(str(formData, "pageKeys") || "[]");

    const data = {
      authorName: str(formData, "authorName"),
      roleDe: str(formData, "roleDe") || null,
      roleEn: str(formData, "roleEn") || null,
      quoteDe: str(formData, "quoteDe"),
      quoteEn: str(formData, "quoteEn"),
      rating: Math.min(5, Math.max(1, num(formData, "rating") || 5)),
      avatarUrl: str(formData, "avatarUrl") || null,
      reviewedOn: str(formData, "reviewedOn") ? new Date(str(formData, "reviewedOn")) : null,
      sortOrder: num(formData, "sortOrder"),
      status: str(formData, "status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    };

    if (!data.authorName || !data.quoteDe || !data.quoteEn) {
      throw new Error("A testimonial needs an author and both German and English quotes.");
    }

    if (data.status === "PUBLISHED") data.publishedAt = new Date();

    let testimonial;

    if (id) {
      const before = await prisma.testimonial.findUnique({
        where: { id },
        include: { placements: true },
      });

      await snapshotVersion({
        entityType: "Testimonial",
        entityId: id,
        payload: before,
        changeNote: "Before edit",
        session,
      });

      testimonial = await prisma.testimonial.update({ where: { id }, data });
      await prisma.testimonialPlacement.deleteMany({ where: { testimonialId: id } });
    } else {
      testimonial = await prisma.testimonial.create({ data });
    }

    if (pageKeys.length) {
      await prisma.testimonialPlacement.createMany({
        data: pageKeys.map((pageKey, index) => ({
          testimonialId: testimonial.id,
          pageKey,
          sortOrder: index,
        })),
        skipDuplicates: true,
      });
    }

    await recordAudit({
      session,
      action: id ? "UPDATE" : "CREATE",
      entityType: "Testimonial",
      entityId: testimonial.id,
      entityLabel: testimonial.authorName,
      next: { status: testimonial.status, pages: pageKeys },
    });

    revalidatePublic(pageKeys);

    return { id: testimonial.id, msg: id ? "Testimonial updated" : "Testimonial created" };
  }, { admin: true });
}

export async function deleteTestimonial(id) {
  return guarded(async (session) => {
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) throw new Error("That testimonial no longer exists.");

    await prisma.testimonial.delete({ where: { id } });

    await recordAudit({
      session,
      action: "DELETE",
      entityType: "Testimonial",
      entityId: id,
      entityLabel: testimonial.authorName,
    });

    revalidatePublic();
    return { msg: "Testimonial deleted" };
  }, { admin: true });
}

/* ----------------------------------- faqs ---------------------------------- */

export async function saveFaqItem(prevState, formData) {
  return guarded(async (session) => {
    const id = str(formData, "id");
    const pageKeys = JSON.parse(str(formData, "pageKeys") || "[]");

    const data = {
      questionDe: str(formData, "questionDe"),
      questionEn: str(formData, "questionEn"),
      answerDe: str(formData, "answerDe"),
      answerEn: str(formData, "answerEn"),
      categoryId: str(formData, "categoryId") || null,
      sortOrder: num(formData, "sortOrder"),
      status: str(formData, "status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    };

    if (!data.questionDe || !data.questionEn || !data.answerDe || !data.answerEn) {
      throw new Error("An FAQ needs a question and answer in both German and English.");
    }

    if (data.status === "PUBLISHED") data.publishedAt = new Date();

    let item;

    if (id) {
      const before = await prisma.faqItem.findUnique({
        where: { id },
        include: { placements: true },
      });

      await snapshotVersion({
        entityType: "FaqItem",
        entityId: id,
        payload: before,
        changeNote: "Before edit",
        session,
      });

      item = await prisma.faqItem.update({ where: { id }, data });
      await prisma.faqPlacement.deleteMany({ where: { faqItemId: id } });
    } else {
      item = await prisma.faqItem.create({ data });
    }

    if (pageKeys.length) {
      await prisma.faqPlacement.createMany({
        data: pageKeys.map((pageKey, index) => ({
          faqItemId: item.id,
          pageKey,
          sortOrder: index,
        })),
        skipDuplicates: true,
      });
    }

    await recordAudit({
      session,
      action: id ? "UPDATE" : "CREATE",
      entityType: "FaqItem",
      entityId: item.id,
      entityLabel: item.questionEn,
      next: { status: item.status, pages: pageKeys },
    });

    revalidatePublic(["/faq", ...pageKeys]);

    return { id: item.id, msg: id ? "FAQ updated" : "FAQ created" };
  }, { admin: true });
}

export async function deleteFaqItem(id) {
  return guarded(async (session) => {
    const item = await prisma.faqItem.findUnique({ where: { id } });
    if (!item) throw new Error("That FAQ no longer exists.");

    await prisma.faqItem.delete({ where: { id } });

    await recordAudit({
      session,
      action: "DELETE",
      entityType: "FaqItem",
      entityId: id,
      entityLabel: item.questionEn,
    });

    revalidatePublic(["/faq"]);
    return { msg: "FAQ deleted" };
  }, { admin: true });
}
