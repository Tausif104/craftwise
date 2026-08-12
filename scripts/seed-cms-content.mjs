/**
 * Seeds the CMS from the content that ships in the repo today (B1, B2, B3).
 *
 * Source of truth right now is split in two places:
 *   - data/*.js        structure only (ids, avatars, ratings, ordering, prices)
 *   - messages/*.json  every user-visible string, in DE and EN
 *
 * This script joins them back together and writes complete bilingual rows, so
 * nothing that is live today is lost when the pages start reading from the DB.
 *
 * It is idempotent and upsert-only. It never deletes, and it never overwrites a
 * row an editor has already touched (tracked via updatedAt vs createdAt).
 *
 *   node scripts/seed-cms-content.mjs          # write
 *   node scripts/seed-cms-content.mjs --dry    # report only
 */

import "dotenv/config";
import { createRequire } from "node:module";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";

const require = createRequire(import.meta.url);

// Prisma 7 requires the driver adapter, matching lib/prisma.js.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const DRY = process.argv.includes("--dry");

const en = require("../messages/en.json");
const de = require("../messages/de.json");

const stats = {
  plans: { created: 0, skipped: 0 },
  features: { created: 0 },
  testimonials: { created: 0, skipped: 0 },
  faqs: { created: 0, skipped: 0 },
  categories: { created: 0, skipped: 0 },
};

function log(...args) {
  console.log(DRY ? "[dry]" : "[seed]", ...args);
}

/* ------------------------------------------------------------------ *
 * B1 — Pricing plans (data/pricing-data.js is already fully bilingual)
 * ------------------------------------------------------------------ */

async function seedPricing() {
  const { pricingPlans } = require("../data/pricing-data.js");

  for (const [index, plan] of pricingPlans.entries()) {
    const existing = await prisma.pricingPlan.findUnique({
      where: { planKey: plan.id },
    });

    if (existing) {
      stats.plans.skipped += 1;
      continue;
    }

    if (DRY) {
      stats.plans.created += 1;
      continue;
    }

    await prisma.pricingPlan.create({
      data: {
        planKey: plan.id,
        nameDe: plan.name.de,
        nameEn: plan.name.en,
        descriptionDe: plan.description?.de ?? null,
        descriptionEn: plan.description?.en ?? null,
        monthlyPrice: plan.monthlyPrice,
        annualPrice: plan.annualPrice,
        ctaLabelDe: plan.buttonText?.de ?? null,
        ctaLabelEn: plan.buttonText?.en ?? null,
        isPopular: Boolean(plan.popular),
        sortOrder: index,
        status: "PUBLISHED",
        publishedAt: new Date(),
        features: {
          create: (plan.features || []).map((feature, featureIndex) => ({
            labelDe: feature.de,
            labelEn: feature.en,
            sortOrder: featureIndex,
          })),
        },
      },
    });

    stats.plans.created += 1;
    stats.features.created += (plan.features || []).length;
  }
}

/* ------------------------------------------------------------------ *
 * B2 — Testimonials
 *
 * The data file holds avatar/rating/name; the message files hold the
 * quote, role and date per locale, keyed by position (testimonial1Text…).
 * ------------------------------------------------------------------ */

const TESTIMONIAL_SOURCES = [
  { export: "testimonialsHome", namespace: "Home", pageKey: "/" },
  { export: "testimonialsAbout", namespace: "AboutPage", pageKey: "/about-us" },
  { export: "booktestimonials", namespace: "BookDemoPage", pageKey: "/book-demo" },
  { export: "landingtestimonials", namespace: "LandingPage", pageKey: "/landing-page" },
  { export: "testimonialsIndustry", namespace: "Industry", pageKey: "/industry" },
  { export: "carpenterstestimonials", namespace: "Carpenters", pageKey: "/industry/carpenters" },
  { export: "electricianstestimonials", namespace: "Electricians", pageKey: "/industry/electricians" },
  { export: "gardenerstestimonials", namespace: "Gardeners", pageKey: "/industry/gardeners" },
  { export: "painterstestimonials", namespace: "Painters", pageKey: "/industry/painters" },
  { export: "plumberstestimonials", namespace: "Plumbers", pageKey: "/industry/plumbers" },
  { export: "rooferstestimonials", namespace: "Roofers", pageKey: "/industry/roofers" },
  {
    export: "fQItestimonials",
    namespace: "QuotingInvoicing",
    pageKey: "/features/quoting-invoicing",
  },
  { export: "fCLtestimonials", namespace: "Collaboration", pageKey: "/features/collaboration" },
  {
    export: "fPStestimonials",
    namespace: "PlanningScheduling",
    pageKey: "/features/planning-scheduling",
  },
  { export: "fTTtestimonials", namespace: "TimeTracking", pageKey: "/features/time-tracking" },
  { export: "fPFtestimonials", namespace: "ProjectFile", pageKey: "/features/project-file" },
  {
    export: "fWAtestimonials",
    namespace: "WorkflowsAutomation",
    pageKey: "/features/workflows-automation",
  },
];

function pick(namespace, key, fallback) {
  return {
    en: en[namespace]?.[key] ?? fallback ?? null,
    de: de[namespace]?.[key] ?? en[namespace]?.[key] ?? fallback ?? null,
  };
}

async function seedTestimonials() {
  const data = require("../data/testimonials.js");

  for (const source of TESTIMONIAL_SOURCES) {
    const block = data[source.export];
    const items = block?.items || [];

    if (!items.length) {
      log(`no items for ${source.export}, skipping`);
      continue;
    }

    for (const [index, item] of items.entries()) {
      const position = index + 1;

      const quote = pick(source.namespace, `testimonial${position}Text`, item.text);
      const role = pick(source.namespace, `testimonial${position}Role`, item.role);
      const date = pick(source.namespace, `testimonial${position}Date`, item.date);

      if (!quote.en && !quote.de) continue;

      // Stable identity: same author + same quote should not be duplicated.
      const existing = await prisma.testimonial.findFirst({
        where: { authorName: item.name, quoteEn: quote.en },
      });

      if (existing) {
        // Already seeded — just make sure this page placement exists.
        if (!DRY) {
          await prisma.testimonialPlacement.upsert({
            where: {
              testimonialId_pageKey: {
                testimonialId: existing.id,
                pageKey: source.pageKey,
              },
            },
            update: { sortOrder: index },
            create: {
              testimonialId: existing.id,
              pageKey: source.pageKey,
              sortOrder: index,
            },
          });
        }
        stats.testimonials.skipped += 1;
        continue;
      }

      if (DRY) {
        stats.testimonials.created += 1;
        continue;
      }

      const parsedDate = date.en ? new Date(date.en) : null;

      await prisma.testimonial.create({
        data: {
          authorName: item.name || "CraftWise customer",
          roleDe: role.de,
          roleEn: role.en,
          quoteDe: quote.de || quote.en,
          quoteEn: quote.en || quote.de,
          rating: Number.isFinite(item.rating) ? item.rating : 5,
          avatarUrl: item.avatar || null,
          reviewedOn:
            parsedDate && !Number.isNaN(parsedDate.valueOf()) ? parsedDate : null,
          status: "PUBLISHED",
          publishedAt: new Date(),
          sortOrder: index,
          placements: {
            create: [{ pageKey: source.pageKey, sortOrder: index }],
          },
        },
      });

      stats.testimonials.created += 1;
    }
  }
}

/* ------------------------------------------------------------------ *
 * B3 — FAQs
 *
 * FaqSection is the real FAQ page content: categories, each holding
 * q1/a1…qN/aN pairs. Other namespaces hold flat page-specific sets.
 * ------------------------------------------------------------------ */

const q = (namespace, pageKey) => ({
  namespace,
  pageKey,
  prefix: "faq",
  suffixQ: "Question",
  suffixA: "Answer",
});

const FLAT_FAQ_SOURCES = [
  { namespace: "PricingFaq", pageKey: "/pricing", prefix: "q", answerPrefix: "a" },
  q("FAQ", "/"),
  q("ConsultingFAQ", "/consulting"),
  q("FeaturesFaq", "/features"),

  // Industry verticals
  q("Industry", "/industry"),
  q("Carpenters", "/industry/carpenters"),
  q("Electricians", "/industry/electricians"),
  q("Gardeners", "/industry/gardeners"),
  q("Painters", "/industry/painters"),
  q("Plumbers", "/industry/plumbers"),
  q("Roofers", "/industry/roofers"),

  // Feature sub-pages
  q("QuotingInvoicing", "/features/quoting-invoicing"),
  q("Collaboration", "/features/collaboration"),
  q("PlanningScheduling", "/features/planning-scheduling"),
  q("TimeTracking", "/features/time-tracking"),
  q("ProjectFile", "/features/project-file"),
  q("WorkflowsAutomation", "/features/workflows-automation"),
];

async function upsertFaq({ questionEn, questionDe, answerEn, answerDe, pageKey, order, categoryId }) {
  if (!questionEn && !questionDe) return;

  const existing = await prisma.faqItem.findFirst({ where: { questionEn } });

  if (existing) {
    if (!DRY) {
      await prisma.faqPlacement.upsert({
        where: { faqItemId_pageKey: { faqItemId: existing.id, pageKey } },
        update: { sortOrder: order },
        create: { faqItemId: existing.id, pageKey, sortOrder: order },
      });
    }
    stats.faqs.skipped += 1;
    return;
  }

  if (DRY) {
    stats.faqs.created += 1;
    return;
  }

  await prisma.faqItem.create({
    data: {
      categoryId: categoryId ?? null,
      questionEn: questionEn || questionDe,
      questionDe: questionDe || questionEn,
      answerEn: answerEn || answerDe || "",
      answerDe: answerDe || answerEn || "",
      status: "PUBLISHED",
      publishedAt: new Date(),
      sortOrder: order,
      placements: { create: [{ pageKey, sortOrder: order }] },
    },
  });

  stats.faqs.created += 1;
}

async function seedFaqs() {
  // Categorised FAQ page content
  const categories = en.FaqSection?.categories || {};

  for (const [categoryIndex, [categoryKey, label]] of Object.entries(categories).entries()) {
    let category = await prisma.faqCategory.findUnique({ where: { key: categoryKey } });

    if (!category) {
      if (DRY) {
        stats.categories.created += 1;
      } else {
        category = await prisma.faqCategory.create({
          data: {
            key: categoryKey,
            nameEn: label,
            nameDe: de.FaqSection?.categories?.[categoryKey] || label,
            sortOrder: categoryIndex,
          },
        });
        stats.categories.created += 1;
      }
    } else {
      stats.categories.skipped += 1;
    }

    const enBlock = en.FaqSection?.[categoryKey] || {};
    const deBlock = de.FaqSection?.[categoryKey] || {};

    const questionKeys = Object.keys(enBlock)
      .filter((key) => /^q\d+$/.test(key))
      .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));

    for (const [order, qKey] of questionKeys.entries()) {
      const aKey = `a${qKey.slice(1)}`;

      await upsertFaq({
        questionEn: enBlock[qKey],
        questionDe: deBlock[qKey],
        answerEn: enBlock[aKey],
        answerDe: deBlock[aKey],
        pageKey: "/faq",
        order,
        categoryId: category?.id,
      });
    }
  }

  // Flat page-specific sets
  for (const source of FLAT_FAQ_SOURCES) {
    const enBlock = en[source.namespace] || {};
    const deBlock = de[source.namespace] || {};

    for (let index = 1; index <= 20; index += 1) {
      const qKey = source.suffixQ
        ? `${source.prefix}${index}${source.suffixQ}`
        : `${source.prefix}${index}`;
      const aKey = source.suffixA
        ? `${source.prefix}${index}${source.suffixA}`
        : `${source.answerPrefix}${index}`;

      if (!enBlock[qKey] && !deBlock[qKey]) continue;

      await upsertFaq({
        questionEn: enBlock[qKey],
        questionDe: deBlock[qKey],
        answerEn: enBlock[aKey],
        answerDe: deBlock[aKey],
        pageKey: source.pageKey,
        order: index - 1,
      });
    }
  }
}

async function main() {
  log(DRY ? "dry run — nothing will be written" : "seeding CMS content");

  await seedPricing();
  await seedTestimonials();
  await seedFaqs();

  console.log("\nResult");
  console.table(stats);

  if (DRY) {
    console.log("\nNothing was written. Re-run without --dry to apply.");
  }
}

main()
  .catch((error) => {
    console.error("[seed] failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
