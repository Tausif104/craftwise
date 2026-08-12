import { prisma } from "@/lib/prisma";

/**
 * Media library (B5).
 *
 * Uploads previously only ever returned a Cloudinary URL — nothing was
 * recorded, so there was no way to browse assets, set alt text, or know whether
 * an image was still in use before deleting it.
 */

export async function registerMediaAsset(result, { session, fileName } = {}) {
  if (!result?.secure_url) return null;

  try {
    return await prisma.mediaAsset.upsert({
      where: { url: result.secure_url },
      update: {
        bytes: result.bytes ?? undefined,
        width: result.width ?? undefined,
        height: result.height ?? undefined,
      },
      create: {
        url: result.secure_url,
        publicId: result.public_id ?? null,
        fileName: fileName || result.original_filename || result.public_id || "upload",
        mimeType: result.resource_type
          ? `${result.resource_type}/${result.format || "unknown"}`
          : null,
        bytes: result.bytes ?? null,
        width: result.width ?? null,
        height: result.height ?? null,
        folder: result.folder ?? null,
        uploadedById: session?.user?.id ?? null,
      },
    });
  } catch (error) {
    // Never fail an upload because the catalogue write failed.
    console.error("[media] could not register asset", error);
    return null;
  }
}

/**
 * Finds where an asset URL is referenced. Used to warn before deleting (B5).
 * Checks the content types that store image URLs directly.
 */
export async function findAssetUsage(url) {
  const [posts, testimonials, legalVersions] = await Promise.all([
    prisma.post.findMany({
      where: { OR: [{ bannerImage: url }, { content: { contains: url } }] },
      select: { id: true, title: true },
      take: 20,
    }),
    prisma.testimonial.findMany({
      where: { avatarUrl: url },
      select: { id: true, authorName: true },
      take: 20,
    }),
    prisma.legalDocumentVersion.findMany({
      where: { OR: [{ heroImage: url }, { bodyHtml: { contains: url } }] },
      select: { id: true, title: true },
      take: 20,
    }),
  ]);

  return [
    ...posts.map((post) => ({ type: "Article", id: post.id, label: post.title })),
    ...testimonials.map((row) => ({
      type: "Testimonial",
      id: row.id,
      label: row.authorName,
    })),
    ...legalVersions.map((row) => ({
      type: "Legal document",
      id: row.id,
      label: row.title,
    })),
  ];
}

export async function listMediaAssets({ search = "", folder = "", take = 120 } = {}) {
  const where = {};

  if (folder) where.folder = folder;
  if (search) {
    where.OR = [
      { fileName: { contains: search, mode: "insensitive" } },
      { altTextDe: { contains: search, mode: "insensitive" } },
      { altTextEn: { contains: search, mode: "insensitive" } },
    ];
  }

  const [assets, folders] = await Promise.all([
    prisma.mediaAsset.findMany({ where, orderBy: { createdAt: "desc" }, take }),
    prisma.mediaAsset.findMany({
      where: { folder: { not: null } },
      distinct: ["folder"],
      select: { folder: true },
    }),
  ]);

  return { assets, folders: folders.map((row) => row.folder).filter(Boolean) };
}
