"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { guarded } from "@/lib/auth-guards";
import { recordAudit } from "@/lib/audit";
import { findAssetUsage } from "@/lib/media";
import { cloudinary } from "@/lib/cloudinary";

export async function updateMediaAsset(id, formData) {
  return guarded(async (session) => {
    const asset = await prisma.mediaAsset.update({
      where: { id },
      data: {
        altTextDe: String(formData.get("altTextDe") || "").trim() || null,
        altTextEn: String(formData.get("altTextEn") || "").trim() || null,
        fileName: String(formData.get("fileName") || "").trim() || undefined,
      },
    });

    await recordAudit({
      session,
      action: "UPDATE",
      entityType: "MediaAsset",
      entityId: id,
      entityLabel: asset.fileName,
    });

    revalidatePath("/dashboard/media");
    return { msg: "Media details saved" };
  });
}

/** Reports where an asset is used so the UI can warn before deleting (B5). */
export async function checkMediaUsage(id) {
  const asset = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!asset) return { success: false, msg: "That asset no longer exists." };

  const usage = await findAssetUsage(asset.url);
  return { success: true, usage };
}

export async function deleteMediaAsset(id, { force = false } = {}) {
  return guarded(async (session) => {
    const asset = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) throw new Error("That asset no longer exists.");

    const usage = await findAssetUsage(asset.url);

    if (usage.length && !force) {
      return {
        blocked: true,
        usage,
        msg: `Still used in ${usage.length} place${usage.length === 1 ? "" : "s"}.`,
      };
    }

    if (asset.publicId) {
      try {
        await cloudinary.uploader.destroy(asset.publicId);
      } catch (error) {
        // Removing the catalogue row is still worthwhile if the remote delete
        // fails; the alternative is an entry that can never be cleared.
        console.error("[media] Cloudinary delete failed", error);
      }
    }

    await prisma.mediaAsset.delete({ where: { id } });

    await recordAudit({
      session,
      action: "DELETE",
      entityType: "MediaAsset",
      entityId: id,
      entityLabel: asset.fileName,
    });

    revalidatePath("/dashboard/media");
    return { msg: "Asset deleted" };
  }, { admin: true });
}
