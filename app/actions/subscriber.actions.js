"use server";

import { prisma } from "@/lib/prisma";
import { guarded } from "@/lib/auth-guards";
import { recordAudit } from "@/lib/audit";

export async function exportSubscribersCsv() {
  return guarded(async (session) => {
    const subscribers = await prisma.earlyAccessSubscriber.findMany({
      orderBy: { createdAt: "desc" },
      take: 10000,
    });

    const header = [
      "Email",
      "State",
      "Signed up",
      "Confirmed",
      "Unsubscribed",
      "Marketing consent",
      "Privacy consent",
      "Terms consent",
      "Language",
      "Source",
      "UTM source",
      "UTM campaign",
    ];

    const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = subscribers.map((subscriber) =>
      [
        subscriber.email,
        subscriber.unsubscribedAt
          ? "unsubscribed"
          : subscriber.confirmedAt
            ? "confirmed"
            : "pending",
        subscriber.createdAt.toISOString(),
        subscriber.confirmedAt?.toISOString() ?? "",
        subscriber.unsubscribedAt?.toISOString() ?? "",
        subscriber.consentMarketing ? "yes" : "no",
        subscriber.consentPrivacy ? "yes" : "no",
        subscriber.consentTerms ? "yes" : "no",
        subscriber.locale,
        subscriber.source,
        subscriber.utmSource,
        subscriber.utmCampaign,
      ]
        .map(escape)
        .join(","),
    );

    await recordAudit({
      session,
      action: "EXPORT",
      entityType: "EarlyAccessSubscriber",
      entityLabel: `${subscribers.length} subscribers`,
    });

    return {
      csv: [header.map(escape).join(","), ...rows].join("\n"),
      count: subscribers.length,
    };
  });
}
