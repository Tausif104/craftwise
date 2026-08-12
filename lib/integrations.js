import { prisma } from "@/lib/prisma";

/**
 * Integration status board (E1).
 *
 * Status is derived from whether the relevant environment variables are set and
 * from recent activity in the database — never from a stored secret. Only a
 * masked hint is ever persisted or shown.
 */

function mask(value) {
  if (!value) return null;
  const text = String(value);
  if (text.length <= 4) return "••••";
  return `${"•".repeat(Math.min(8, text.length - 4))}${text.slice(-4)}`;
}

const DEFINITIONS = [
  {
    key: "google_analytics",
    name: "Google Analytics 4",
    configUrl: "https://analytics.google.com/",
    isConfigured: () => Boolean(process.env.GA4_PROPERTY_ID || process.env.NEXT_PUBLIC_GA_ID),
    hint: () => mask(process.env.GA4_PROPERTY_ID || process.env.NEXT_PUBLIC_GA_ID),
  },
  {
    key: "calendly",
    name: "Calendly",
    configUrl: "https://calendly.com/event_types",
    isConfigured: () => Boolean(process.env.CALENDLY_TOKEN || process.env.NEXT_PUBLIC_BOOKING_URL),
    hint: () => mask(process.env.CALENDLY_TOKEN),
  },
  {
    key: "email_smtp",
    name: "Email (Gmail SMTP)",
    configUrl: "https://myaccount.google.com/apppasswords",
    isConfigured: () =>
      Boolean(
        process.env.GMAIL_USER &&
          process.env.GMAIL_APP_PASSWORD &&
          !String(process.env.GMAIL_USER).startsWith("your.account") &&
          !/^x+$/i.test(String(process.env.GMAIL_APP_PASSWORD)),
      ),
    hint: () => mask(process.env.GMAIL_USER),
  },
  {
    key: "cloudinary",
    name: "Cloudinary (media)",
    configUrl: "https://console.cloudinary.com/",
    isConfigured: () =>
      Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_SECRET),
    hint: () => mask(process.env.CLOUDINARY_API_KEY),
  },
  {
    key: "database",
    name: "Database (Neon Postgres)",
    configUrl: "https://console.neon.tech/",
    isConfigured: () => Boolean(process.env.DATABASE_URL),
    hint: () => "connection string set",
  },
];

export async function getIntegrationStatuses() {
  const stored = await prisma.integration.findMany();
  const byKey = new Map(stored.map((row) => [row.key, row]));

  // Recent delivery failures are the clearest signal that email is broken.
  const [failedDeliveries, lastMessage] = await Promise.all([
    prisma.integrationDelivery.count({ where: { status: { in: ["FAILED", "RETRYING"] } } }),
    prisma.leadMessage.findFirst({
      where: { status: "SENT" },
      orderBy: { sentAt: "desc" },
      select: { sentAt: true },
    }),
  ]);

  return DEFINITIONS.map((definition) => {
    const row = byKey.get(definition.key);
    const configured = definition.isConfigured();

    let status = configured ? "CONNECTED" : "NOT_CONFIGURED";
    let detail = null;

    if (definition.key === "email_smtp") {
      if (!configured) {
        detail = "Credentials are still placeholders in .env";
      } else if (failedDeliveries > 0) {
        status = "ERROR";
        detail = `${failedDeliveries} notification${failedDeliveries === 1 ? "" : "s"} failing`;
      }
    }

    return {
      key: definition.key,
      name: definition.name,
      status: row?.status && row.status !== "NOT_CONFIGURED" ? row.status : status,
      credentialHint: definition.hint(),
      configUrl: definition.configUrl,
      lastSyncAt:
        definition.key === "email_smtp" ? (lastMessage?.sentAt ?? null) : (row?.lastSyncAt ?? null),
      lastError: detail || row?.lastError || null,
    };
  });
}
