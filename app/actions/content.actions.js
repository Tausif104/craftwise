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

/**
 * Public pages live under `app/[locale]/…` and German URLs are rewritten by
 * next-intl (`/preise` -> `/de/pricing`), so revalidating the literal public URL
 * misses the cache entry. Revalidating the route pattern refreshes every locale
 * of that page at once.
 */
function revalidatePublic(pageKeys = []) {
  revalidatePath("/dashboard");

  for (const key of pageKeys) {
    if (!key || !key.startsWith("/")) continue;
    revalidatePath(key === "/" ? "/[locale]" : `/[locale]${key}`, "page");
  }
}

/**
 * "Save" must never silently unpublish live content.
 *
 * Editors kept losing published plans by pressing Save on an already-live
 * record: the form posted DRAFT, the record left the website, and the public
 * page quietly fell back to the static file. `KEEP` (what Save now sends when
 * editing published content) preserves the current state; DRAFT is only applied
 * when the editor explicitly unpublishes.
 */
function resolveStatus(requested, existing) {
  if (requested === "PUBLISHED") return "PUBLISHED";
  if (requested === "DRAFT") return "DRAFT";
  return existing?.status || "DRAFT";
}

/* --------------------------------- pricing -------------------------------- */

export async function savePricingPlan(prevState, formData) {
  return guarded(async (session) => {
    const id = str(formData, "id");

    const before = id
      ? await prisma.pricingPlan.findUnique({ where: { id }, include: { features: true } })
      : null;

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
      status: resolveStatus(str(formData, "status"), before),
    };

    if (!data.planKey || !data.nameDe || !data.nameEn) {
      throw new Error("A plan needs a key and both German and English names.");
    }

    if (data.status === "PUBLISHED") data.publishedAt = new Date();

    const features = JSON.parse(str(formData, "features") || "[]");

    let plan;

    if (id) {
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

    revalidatePublic(["/pricing"]);

    return {
      id: plan.id,
      msg: id ? "Plan updated" : "Plan created",
      status: plan.status,
    };
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

    revalidatePublic(["/pricing"]);
    return { msg: "Plan deleted" };
  }, { admin: true });
}

/* ------------------------------- testimonials ------------------------------ */

export async function saveTestimonial(prevState, formData) {
  return guarded(async (session) => {
    const id = str(formData, "id");
    const pageKeys = JSON.parse(str(formData, "pageKeys") || "[]");

    const before = id
      ? await prisma.testimonial.findUnique({ where: { id }, include: { placements: true } })
      : null;

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
      status: resolveStatus(str(formData, "status"), before),
    };

    if (!data.authorName || !data.quoteDe || !data.quoteEn) {
      throw new Error("A testimonial needs an author and both German and English quotes.");
    }

    if (data.status === "PUBLISHED") data.publishedAt = new Date();

    let testimonial;

    if (id) {
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
      // Public pages order by placement.sortOrder, so it has to carry the order
      // the editor actually set. It used to store the index of the page picker,
      // which meant the Order field changed nothing on the website.
      await prisma.testimonialPlacement.createMany({
        data: pageKeys.map((pageKey) => ({
          testimonialId: testimonial.id,
          pageKey,
          sortOrder: data.sortOrder,
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

    revalidatePublic([...pageKeys, ...(before?.placements || []).map((p) => p.pageKey)]);

    return {
      id: testimonial.id,
      msg: id ? "Testimonial updated" : "Testimonial created",
      status: testimonial.status,
    };
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

    const before = id
      ? await prisma.faqItem.findUnique({ where: { id }, include: { placements: true } })
      : null;

    const data = {
      questionDe: str(formData, "questionDe"),
      questionEn: str(formData, "questionEn"),
      answerDe: str(formData, "answerDe"),
      answerEn: str(formData, "answerEn"),
      categoryId: str(formData, "categoryId") || null,
      sortOrder: num(formData, "sortOrder"),
      status: resolveStatus(str(formData, "status"), before),
    };

    if (!data.questionDe || !data.questionEn || !data.answerDe || !data.answerEn) {
      throw new Error("An FAQ needs a question and answer in both German and English.");
    }

    if (data.status === "PUBLISHED") data.publishedAt = new Date();

    let item;

    if (id) {
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
      // Same fix as testimonials: the public FAQ order comes from the placement
      // row, so the editor's Order value has to be written into it.
      await prisma.faqPlacement.createMany({
        data: pageKeys.map((pageKey) => ({
          faqItemId: item.id,
          pageKey,
          sortOrder: data.sortOrder,
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

    revalidatePublic([
      "/faq",
      ...pageKeys,
      ...(before?.placements || []).map((placement) => placement.pageKey),
    ]);

    return {
      id: item.id,
      msg: id ? "FAQ updated" : "FAQ created",
      status: item.status,
    };
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

/* ------------------------------ ordering (B2/B3) --------------------------- */

/**
 * Writes the order shown in the admin list back to the database, including the
 * placement rows the public pages actually sort on.
 */
async function applyOrder({ orderedIds, itemModel, placementModel, foreignKey }) {
  if (!Array.isArray(orderedIds) || !orderedIds.length) return 0;

  await prisma.$transaction(
    orderedIds.flatMap((id, index) => [
      itemModel.update({ where: { id }, data: { sortOrder: index } }),
      placementModel.updateMany({ where: { [foreignKey]: id }, data: { sortOrder: index } }),
    ]),
  );

  return orderedIds.length;
}

export async function reorderFaqItems(orderedIds) {
  return guarded(async (session) => {
    const count = await applyOrder({
      orderedIds,
      itemModel: prisma.faqItem,
      placementModel: prisma.faqPlacement,
      foreignKey: "faqItemId",
    });

    const pageKeys = await prisma.faqPlacement.findMany({
      where: { faqItemId: { in: orderedIds } },
      select: { pageKey: true },
      distinct: ["pageKey"],
    });

    await recordAudit({
      session,
      action: "UPDATE",
      entityType: "FaqItem",
      entityLabel: `Reordered ${count} FAQs`,
    });

    revalidatePublic(["/faq", ...pageKeys.map((row) => row.pageKey)]);
    return { msg: "Order saved" };
  }, { admin: true });
}

export async function reorderTestimonials(orderedIds) {
  return guarded(async (session) => {
    const count = await applyOrder({
      orderedIds,
      itemModel: prisma.testimonial,
      placementModel: prisma.testimonialPlacement,
      foreignKey: "testimonialId",
    });

    const pageKeys = await prisma.testimonialPlacement.findMany({
      where: { testimonialId: { in: orderedIds } },
      select: { pageKey: true },
      distinct: ["pageKey"],
    });

    await recordAudit({
      session,
      action: "UPDATE",
      entityType: "Testimonial",
      entityLabel: `Reordered ${count} testimonials`,
    });

    revalidatePublic(pageKeys.map((row) => row.pageKey));
    return { msg: "Order saved" };
  }, { admin: true });
}

/* ------------------------------ FAQ categories ----------------------------- */

/**
 * The FAQ page renders one section per category, but categories could only be
 * created by the seed script — so everything an editor added landed in a single
 * unnamed section. This is the missing management surface (B3).
 */
function categoryKeyFrom(value, fallback) {
  const source = value || fallback || "";
  return (
    source
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || null
  );
}

export async function saveFaqCategory(prevState, formData) {
  return guarded(async (session) => {
    const id = str(formData, "id");
    const nameDe = str(formData, "nameDe");
    const nameEn = str(formData, "nameEn");
    const submittedKey = str(formData, "key");

    const existing = id ? await prisma.faqCategory.findUnique({ where: { id } }) : null;

    // Seeded keys are camelCase and drive the section slug on the FAQ page, so
    // an untouched key is kept verbatim — renaming a section must not silently
    // change its URL.
    const key =
      existing && submittedKey === existing.key
        ? existing.key
        : categoryKeyFrom(submittedKey, nameEn || nameDe);

    if (!nameDe || !nameEn) {
      throw new Error("A category needs both a German and an English name.");
    }

    if (!key) {
      throw new Error("A category needs a key.");
    }

    const clash = await prisma.faqCategory.findUnique({ where: { key } });
    if (clash && clash.id !== id) {
      throw new Error(`The key "${key}" is already used by another category.`);
    }

    const data = { key, nameDe, nameEn, sortOrder: num(formData, "sortOrder") };

    const category = id
      ? await prisma.faqCategory.update({ where: { id }, data })
      : await prisma.faqCategory.create({ data });

    await recordAudit({
      session,
      action: id ? "UPDATE" : "CREATE",
      entityType: "FaqCategory",
      entityId: category.id,
      entityLabel: category.nameEn,
    });

    revalidatePublic(["/faq"]);
    return { id: category.id, msg: id ? "Category updated" : "Category created" };
  }, { admin: true });
}

export async function deleteFaqCategory(id) {
  return guarded(async (session) => {
    const category = await prisma.faqCategory.findUnique({
      where: { id },
      include: { _count: { select: { items: true } } },
    });

    if (!category) throw new Error("That category no longer exists.");

    // FaqItem.categoryId is SetNull, so the questions survive uncategorised
    // rather than disappearing from the website with the category.
    await prisma.faqCategory.delete({ where: { id } });

    await recordAudit({
      session,
      action: "DELETE",
      entityType: "FaqCategory",
      entityId: id,
      entityLabel: category.nameEn,
    });

    revalidatePublic(["/faq"]);

    return {
      msg: category._count.items
        ? `Category deleted. ${category._count.items} FAQ(s) are now uncategorised.`
        : "Category deleted",
    };
  }, { admin: true });
}
