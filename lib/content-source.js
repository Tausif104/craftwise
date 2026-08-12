import { prisma } from "@/lib/prisma";

/**
 * Public content reads (B1, B2, B3).
 *
 * Every loader follows the pattern the legal pages already use: try the
 * database, and fall back to the static file that shipped with the repo if the
 * database is empty or unreachable. A failed query must never blank a live
 * marketing page — worst case the visitor sees exactly what they see today.
 */

function localised(row, field, locale) {
  const suffix = locale === "en" ? "En" : "De";
  return row[`${field}${suffix}`] ?? row[`${field}En`] ?? row[`${field}De`] ?? null;
}

/* --------------------------------- pricing -------------------------------- */

/**
 * Returns plans in the same `{ en, de }` shape as data/pricing-data.js, so the
 * existing Price component works unchanged and the static file stays a true
 * drop-in fallback.
 */
export async function getPricingPlans() {
  try {
    const plans = await prisma.pricingPlan.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
      include: { features: { orderBy: { sortOrder: "asc" } } },
    });

    if (!plans.length) return null;

    const pair = (row, field) => ({
      en: row[`${field}En`] ?? row[`${field}De`] ?? "",
      de: row[`${field}De`] ?? row[`${field}En`] ?? "",
    });

    return plans.map((plan) => ({
      id: plan.planKey,
      name: pair(plan, "name"),
      description: pair(plan, "description"),
      monthlyPrice: Number(plan.monthlyPrice),
      annualPrice: Number(plan.annualPrice),
      popular: plan.isPopular,
      buttonText: pair(plan, "ctaLabel"),
      ctaHref: plan.ctaHref,
      features: plan.features.map((feature) => pair(feature, "label")),
    }));
  } catch (error) {
    console.error("[content] pricing fell back to static data:", error.message);
    return null;
  }
}

/* ------------------------------- testimonials ------------------------------ */

export async function getTestimonials(pageKey, locale = "de") {
  try {
    const placements = await prisma.testimonialPlacement.findMany({
      where: { pageKey, testimonial: { status: "PUBLISHED" } },
      orderBy: { sortOrder: "asc" },
      include: { testimonial: true },
    });

    if (!placements.length) return null;

    return placements.map(({ testimonial }, index) => ({
      id: testimonial.id,
      rating: testimonial.rating,
      date: testimonial.reviewedOn
        ? testimonial.reviewedOn.toLocaleDateString(locale === "en" ? "en-GB" : "de-DE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : null,
      text: localised(testimonial, "quote", locale),
      name: testimonial.authorName,
      role: localised(testimonial, "role", locale),
      avatar: testimonial.avatarUrl,
      sortOrder: index,
    }));
  } catch (error) {
    console.error("[content] testimonials fell back to static data:", error.message);
    return null;
  }
}

/* ----------------------------------- faqs ---------------------------------- */

export async function getFaqs(pageKey, locale = "de") {
  try {
    const placements = await prisma.faqPlacement.findMany({
      where: { pageKey, faqItem: { status: "PUBLISHED" } },
      orderBy: { sortOrder: "asc" },
      include: { faqItem: { include: { category: true } } },
    });

    if (!placements.length) return null;

    return placements.map(({ faqItem }) => ({
      id: faqItem.id,
      question: localised(faqItem, "question", locale),
      answer: localised(faqItem, "answer", locale),
      category: faqItem.category
        ? {
            key: faqItem.category.key,
            name: localised(faqItem.category, "name", locale),
          }
        : null,
    }));
  } catch (error) {
    console.error("[content] faqs fell back to static data:", error.message);
    return null;
  }
}

/**
 * Groups FAQ rows by category for the main FAQ page, which renders a category
 * picker rather than a flat list.
 */
export async function getFaqsByCategory(pageKey, locale = "de") {
  const items = await getFaqs(pageKey, locale);
  if (!items) return null;

  const grouped = new Map();

  for (const item of items) {
    const key = item.category?.key || "general";
    if (!grouped.has(key)) {
      grouped.set(key, { key, name: item.category?.name || null, items: [] });
    }
    grouped.get(key).items.push(item);
  }

  return [...grouped.values()];
}

/** camelCase category key -> the kebab slug the FAQ page routes on. */
export function categorySlug(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

/**
 * Shape the FAQ page needs: a category list plus a map of slug -> items using
 * that page's own `{ title, content }` field names.
 *
 * Returns null when the CMS has nothing, so the page keeps its translated
 * content as the fallback.
 */
export async function getFaqPageContent(pageKey = "/faq", locale = "de") {
  const groups = await getFaqsByCategory(pageKey, locale);
  if (!groups?.length) return null;

  const categories = [];
  const faqData = {};

  groups.forEach((group, index) => {
    const slug = categorySlug(group.key);

    categories.push({ id: index + 1, name: group.name || group.key, slug });

    faqData[slug] = group.items.map((item) => ({
      title: item.question,
      content: item.answer,
    }));
  });

  return { categories, faqData };
}
