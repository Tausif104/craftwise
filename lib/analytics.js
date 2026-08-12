import { prisma } from "@/lib/prisma";

/**
 * Analytics (D1, D2, A4).
 *
 * Felix's rule: GA4 owns traffic and behaviour, CraftWise owns leads. So every
 * number here that represents an actual enquiry comes from our own database and
 * is always available. GA4 traffic data is layered on top when configured, and
 * its absence must never break the page.
 */

export function resolveRange(rangeKey = "30d") {
  const days = { "7d": 7, "30d": 30, "90d": 90, "12m": 365 }[rangeKey] ?? 30;

  const to = new Date();
  const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);
  const previousFrom = new Date(from.getTime() - days * 24 * 60 * 60 * 1000);

  return { from, to, previousFrom, previousTo: from, days, rangeKey };
}

function percentChange(current, previous) {
  if (!previous) return current ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

/** Leads and conversions straight from our own tables. */
export async function getLeadMetrics(range) {
  const [current, previous, byType, byStatus, bySource, daily] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: range.from, lte: range.to } } }),
    prisma.lead.count({
      where: { createdAt: { gte: range.previousFrom, lt: range.previousTo } },
    }),
    prisma.lead.groupBy({
      by: ["type"],
      where: { createdAt: { gte: range.from, lte: range.to } },
      _count: { _all: true },
    }),
    prisma.lead.groupBy({
      by: ["status"],
      where: { createdAt: { gte: range.from, lte: range.to } },
      _count: { _all: true },
    }),
    prisma.lead.groupBy({
      by: ["utmSource"],
      where: { createdAt: { gte: range.from, lte: range.to } },
      _count: { _all: true },
    }),
    prisma.$queryRaw`
      SELECT date_trunc('day', "createdAt")::date AS day, COUNT(*)::int AS count
      FROM "Lead"
      WHERE "createdAt" >= ${range.from} AND "createdAt" <= ${range.to}
      GROUP BY 1
      ORDER BY 1 ASC
    `,
  ]);

  const subscribers = await prisma.earlyAccessSubscriber.count({
    where: { createdAt: { gte: range.from, lte: range.to } },
  });

  const won = byStatus.find((row) => row.status === "WON")?._count?._all ?? 0;

  return {
    total: current,
    previous,
    change: percentChange(current, previous),
    subscribers,
    won,
    byType: Object.fromEntries(byType.map((row) => [row.type, row._count._all])),
    byStatus: Object.fromEntries(byStatus.map((row) => [row.status, row._count._all])),
    bySource: bySource
      .map((row) => ({ source: row.utmSource || "Direct", count: row._count._all }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    daily: (daily || []).map((row) => ({
      day: row.day instanceof Date ? row.day.toISOString().slice(0, 10) : String(row.day),
      count: Number(row.count),
    })),
  };
}

/** Landing pages that actually produced enquiries. */
export async function getLandingPagePerformance(range) {
  const rows = await prisma.lead.groupBy({
    by: ["landingPage"],
    where: { createdAt: { gte: range.from, lte: range.to } },
    _count: { _all: true },
  });

  return rows
    .map((row) => ({ page: row.landingPage || "Unknown", leads: row._count._all }))
    .sort((a, b) => b.leads - a.leads)
    .slice(0, 10);
}

/**
 * GA4 status. Reporting needs a service account, which is not configured here,
 * so this reports honestly rather than inventing traffic numbers.
 */
export async function getGa4Status() {
  const setting = await prisma.trackingSetting
    .findUnique({ where: { environment: "production" } })
    .catch(() => null);

  const measurementId = setting?.ga4MeasurementId || process.env.NEXT_PUBLIC_GA_ID || null;
  const propertyId = setting?.ga4PropertyId || process.env.GA4_PROPERTY_ID || null;
  const hasCredentials = Boolean(process.env.GA4_SERVICE_ACCOUNT_JSON);

  return {
    measurementId,
    propertyId,
    hasCredentials,
    connected: Boolean(propertyId && hasCredentials),
    reason: !propertyId
      ? "No GA4 property ID set. Add it under SEO & Tracking."
      : !hasCredentials
        ? "GA4 reporting needs a service account. Set GA4_SERVICE_ACCOUNT_JSON to pull traffic data."
        : null,
  };
}
