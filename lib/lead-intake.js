import { prisma } from "@/lib/prisma";

/**
 * Lead capture (C2).
 *
 * The contract Felix set is that a lead must never disappear because a
 * downstream integration was briefly unavailable. So capture is split in two:
 *
 *   1. Write the Lead row. This is the source of truth and must succeed.
 *   2. Enqueue an IntegrationDelivery per downstream target. Those are retried
 *      with backoff and can fail for hours without losing the enquiry.
 *
 * Nothing in step 2 is allowed to throw into step 1.
 */

const LEAD_TYPES = new Set(["CONTACT", "CONSULTING", "DEMO", "WAITLIST", "OTHER"]);

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

/** Downstream targets a captured lead should be forwarded to. */
const DELIVERY_TARGETS = ["notify_sales"];

function clean(value, max = 2000) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Pulls UTM values from an object of query params or a URL string. */
export function extractUtm(source) {
  const params =
    typeof source === "string"
      ? Object.fromEntries(new URL(source, "http://localhost").searchParams)
      : source || {};

  return {
    utmSource: clean(params.utm_source, 200),
    utmMedium: clean(params.utm_medium, 200),
    utmCampaign: clean(params.utm_campaign, 200),
    utmTerm: clean(params.utm_term, 200),
    utmContent: clean(params.utm_content, 200),
  };
}

export function normalizeLeadInput(input = {}) {
  const errors = {};

  const email = clean(input.email, 320);
  if (!email || !isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  const type = LEAD_TYPES.has(input.type) ? input.type : "OTHER";
  const name = clean(input.name, 200);
  const message = clean(input.message, 5000);

  if (type === "CONTACT" && !message) {
    errors.message = "Tell us what you need help with.";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
    data: {
      type,
      email: email ? email.toLowerCase() : null,
      name,
      phone: clean(input.phone, 60),
      company: clean(input.company, 200),
      message,
      locale: input.locale === "en" ? "en" : "de",
      consentGiven: Boolean(input.consentGiven),
      consentAt: input.consentGiven ? new Date() : null,
      landingPage: clean(input.landingPage, 500),
      referrer: clean(input.referrer, 500),
      ipAddress: clean(input.ipAddress, 100),
      userAgent: clean(input.userAgent, 500),
      ...extractUtm(input.utm || input),
      payload: input.extra && typeof input.extra === "object" ? input.extra : undefined,
    },
  };
}

/**
 * Captures a lead and queues downstream delivery.
 * Returns { success, leadId } — never throws for delivery problems.
 */
export async function captureLead(rawInput) {
  const { valid, errors, data } = normalizeLeadInput(rawInput);

  if (!valid) {
    return { success: false, errors, msg: "Please check the highlighted fields." };
  }

  const lead = await prisma.lead.create({
    data: { ...data, lastActivityAt: new Date() },
  });

  // Best effort. A failure here must not surface to the visitor, because the
  // lead itself is already safely stored.
  try {
    await prisma.integrationDelivery.createMany({
      data: DELIVERY_TARGETS.map((target) => ({
        leadId: lead.id,
        target,
        status: "PENDING",
        nextAttemptAt: new Date(),
        payload: { leadId: lead.id, type: lead.type, email: lead.email },
      })),
    });
  } catch (error) {
    console.error("[lead-intake] could not queue delivery for", lead.id, error);
  }

  return { success: true, leadId: lead.id };
}

/** Exponential backoff: 1m, 4m, 9m, 16m, 25m. */
function backoffMs(attempts) {
  return Math.min(attempts * attempts * 60_000, 60 * 60_000);
}

/**
 * Processes queued deliveries. Safe to call repeatedly — it only claims rows
 * that are due, and it records the error rather than losing the attempt.
 */
export async function processDeliveryQueue({ limit = 25, handlers = {} } = {}) {
  const due = await prisma.integrationDelivery.findMany({
    where: {
      status: { in: ["PENDING", "RETRYING"] },
      OR: [{ nextAttemptAt: null }, { nextAttemptAt: { lte: new Date() } }],
    },
    orderBy: { createdAt: "asc" },
    take: limit,
    include: { lead: true },
  });

  const results = { delivered: 0, retrying: 0, failed: 0 };

  for (const delivery of due) {
    const handler = handlers[delivery.target];
    const attempts = delivery.attempts + 1;

    try {
      if (!handler) {
        throw new Error(`No handler registered for target "${delivery.target}".`);
      }

      await handler(delivery);

      await prisma.integrationDelivery.update({
        where: { id: delivery.id },
        data: {
          status: "DELIVERED",
          attempts,
          deliveredAt: new Date(),
          lastError: null,
          nextAttemptAt: null,
        },
      });
      results.delivered += 1;
    } catch (error) {
      const exhausted = attempts >= delivery.maxAttempts;

      await prisma.integrationDelivery.update({
        where: { id: delivery.id },
        data: {
          status: exhausted ? "FAILED" : "RETRYING",
          attempts,
          lastError: String(error?.message || error).slice(0, 1000),
          nextAttemptAt: exhausted ? null : new Date(Date.now() + backoffMs(attempts)),
        },
      });

      if (exhausted) results.failed += 1;
      else results.retrying += 1;
    }
  }

  return results;
}

export async function getDeliveryHealth() {
  const grouped = await prisma.integrationDelivery.groupBy({
    by: ["status"],
    _count: { _all: true },
  });

  return grouped.reduce(
    (acc, row) => ({ ...acc, [row.status]: row._count._all }),
    { PENDING: 0, RETRYING: 0, DELIVERED: 0, FAILED: 0 },
  );
}
