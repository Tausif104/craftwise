import { prisma } from "@/lib/prisma";

/**
 * Audit trail (E3).
 *
 * Every publish, pricing change, legal edit and settings change goes through
 * here. Failures are swallowed on purpose: an audit write must never be the
 * reason a content save fails.
 */
export async function recordAudit({
  session,
  action,
  entityType,
  entityId,
  entityLabel,
  previous,
  next,
}) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: session?.user?.id ?? null,
        actorEmail: session?.user?.email ?? null,
        action,
        entityType,
        entityId: entityId ?? null,
        entityLabel: entityLabel ?? null,
        previouses: previous ?? undefined,
        next: next ?? undefined,
      },
    });
  } catch (error) {
    console.error("[audit] failed to record entry", error);
  }
}

export async function listAuditEntries({
  actorId,
  action,
  entityType,
  from,
  to,
  take = 100,
  skip = 0,
} = {}) {
  const where = {};

  if (actorId) where.actorId = actorId;
  if (action) where.action = action;
  if (entityType) where.entityType = entityType;

  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) where.createdAt.lte = new Date(to);
  }

  const [entries, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take,
      skip,
      include: { actor: { select: { id: true, name: true, email: true } } },
    }),
    prisma.auditLog.count({ where }),
  ]);

  return { entries, total };
}
