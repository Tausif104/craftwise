"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { guarded } from "@/lib/auth-guards";
import { recordAudit } from "@/lib/audit";

const str = (formData, key) => String(formData.get(key) || "").trim();
const bool = (formData, key) => formData.get(key) === "on" || formData.get(key) === "true";

export async function saveSeoSetting(prevState, formData) {
  return guarded(async (session) => {
    const pathKey = str(formData, "pathKey") || "*";

    const data = {
      pathKey,
      isSiteDefault: pathKey === "*",
      metaTitleDe: str(formData, "metaTitleDe") || null,
      metaTitleEn: str(formData, "metaTitleEn") || null,
      metaDescriptionDe: str(formData, "metaDescriptionDe") || null,
      metaDescriptionEn: str(formData, "metaDescriptionEn") || null,
      ogTitleDe: str(formData, "ogTitleDe") || null,
      ogTitleEn: str(formData, "ogTitleEn") || null,
      ogDescriptionDe: str(formData, "ogDescriptionDe") || null,
      ogDescriptionEn: str(formData, "ogDescriptionEn") || null,
      ogImageUrl: str(formData, "ogImageUrl") || null,
      canonicalUrl: str(formData, "canonicalUrl") || null,
      noIndex: bool(formData, "noIndex"),
      noFollow: bool(formData, "noFollow"),
    };

    const setting = await prisma.seoSetting.upsert({
      where: { pathKey },
      update: data,
      create: data,
    });

    await recordAudit({
      session,
      action: "SETTINGS_CHANGE",
      entityType: "SeoSetting",
      entityId: setting.id,
      entityLabel: pathKey,
      next: { noIndex: data.noIndex, noFollow: data.noFollow },
    });

    revalidatePath("/dashboard/seo");
    if (pathKey !== "*") revalidatePath(pathKey);

    return { msg: pathKey === "*" ? "Site defaults saved" : `Settings saved for ${pathKey}` };
  }, { admin: true });
}

export async function deleteSeoSetting(id) {
  return guarded(async (session) => {
    const setting = await prisma.seoSetting.findUnique({ where: { id } });
    if (!setting) throw new Error("That override no longer exists.");
    if (setting.isSiteDefault) throw new Error("The site defaults cannot be deleted.");

    await prisma.seoSetting.delete({ where: { id } });

    await recordAudit({
      session,
      action: "DELETE",
      entityType: "SeoSetting",
      entityId: id,
      entityLabel: setting.pathKey,
    });

    revalidatePath("/dashboard/seo");
    return { msg: "Override removed" };
  }, { admin: true });
}

export async function saveTrackingSetting(prevState, formData) {
  return guarded(async (session) => {
    const environment = str(formData, "environment") || "production";

    const data = {
      environment,
      ga4MeasurementId: str(formData, "ga4MeasurementId") || null,
      ga4PropertyId: str(formData, "ga4PropertyId") || null,
      gtmContainerId: str(formData, "gtmContainerId") || null,
      consentRequired: bool(formData, "consentRequired"),
    };

    await prisma.trackingSetting.upsert({
      where: { environment },
      update: data,
      create: data,
    });

    await recordAudit({
      session,
      action: "SETTINGS_CHANGE",
      entityType: "TrackingSetting",
      entityLabel: environment,
      next: { ...data },
    });

    revalidatePath("/dashboard/seo");
    return { msg: "Tracking settings saved" };
  }, { admin: true });
}
