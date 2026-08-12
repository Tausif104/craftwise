import { listAuditEntries } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import AuditLogBrowser from "@/components/dashboard/audit-log-browser";

export const dynamic = "force-dynamic";

export default async function AuditLogPage({ searchParams }) {
  const params = await searchParams;

  const [{ entries, total }, actors] = await Promise.all([
    listAuditEntries({
      action: params?.action || undefined,
      entityType: params?.entity || undefined,
      actorId: params?.actor || undefined,
      from: params?.from || undefined,
      to: params?.to || undefined,
    }),
    prisma.user.findMany({ select: { id: true, name: true, email: true } }),
  ]);

  return (
    <AuditLogBrowser
      entries={JSON.parse(JSON.stringify(entries))}
      total={total}
      actors={actors}
      filters={{
        action: params?.action ?? "",
        entity: params?.entity ?? "",
        actor: params?.actor ?? "",
        from: params?.from ?? "",
        to: params?.to ?? "",
      }}
    />
  );
}
