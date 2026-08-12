import { prisma } from "@/lib/prisma";
import SubscribersBrowser from "@/components/dashboard/subscribers-browser";

export const dynamic = "force-dynamic";

export default async function SubscribersPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.q ?? "";

  const where = search
    ? { email: { contains: search, mode: "insensitive" } }
    : {};

  const [subscribers, total, confirmed, unsubscribed] = await Promise.all([
    prisma.earlyAccessSubscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.earlyAccessSubscriber.count({ where }),
    prisma.earlyAccessSubscriber.count({ where: { confirmedAt: { not: null } } }),
    prisma.earlyAccessSubscriber.count({ where: { unsubscribedAt: { not: null } } }),
  ]);

  return (
    <SubscribersBrowser
      subscribers={subscribers}
      stats={{ total, confirmed, unsubscribed }}
      search={search}
    />
  );
}
