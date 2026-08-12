import { prisma } from "@/lib/prisma";

/**
 * Version history for any content type (A3).
 *
 * LegalDocumentVersion already does this properly for legal documents, but a
 * dedicated version table per content type does not scale to pricing plans,
 * testimonials, FAQs, banners and articles. This stores an immutable JSON
 * snapshot keyed by (entityType, entityId, versionNumber) instead.
 */

export async function snapshotVersion({
  entityType,
  entityId,
  payload,
  changeNote,
  session,
  tx = prisma,
}) {
  const latest = await tx.contentVersion.findFirst({
    where: { entityType, entityId },
    orderBy: { versionNumber: "desc" },
    select: { versionNumber: true },
  });

  return tx.contentVersion.create({
    data: {
      entityType,
      entityId,
      versionNumber: (latest?.versionNumber ?? 0) + 1,
      payload,
      changeNote: changeNote || null,
      createdById: session?.user?.id ?? null,
    },
  });
}

export async function listVersions({ entityType, entityId, take = 30 }) {
  return prisma.contentVersion.findMany({
    where: { entityType, entityId },
    orderBy: { versionNumber: "desc" },
    take,
    include: { createdBy: { select: { id: true, name: true, email: true } } },
  });
}

export async function getVersion(versionId) {
  return prisma.contentVersion.findUnique({
    where: { id: versionId },
    include: { createdBy: { select: { id: true, name: true, email: true } } },
  });
}

/**
 * Returns the stored payload for a version so a caller can write it back onto
 * the live record. Restoring is deliberately left to the caller: each content
 * type knows which of its own fields are safe to overwrite.
 */
export async function getRestorePayload(versionId) {
  const version = await getVersion(versionId);

  if (!version) {
    throw new Error("That version no longer exists.");
  }

  return version.payload;
}
