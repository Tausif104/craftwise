import { routing } from "@/i18n/routing";
import { ANNOUNCEMENT_COOKIE_PREFIX } from "@/lib/announcement-client";
import { prisma } from "@/lib/prisma";

function isScheduled(activeAt, expiresAt, now) {
  if (activeAt && activeAt > now) return false;
  if (expiresAt && expiresAt < now) return false;
  return true;
}

function isTargeted(announcement, pageKey) {
  if (announcement.targetMode === "ALL_PAGES") return true;
  return announcement.pageTargets.includes(pageKey);
}

export async function getAdminAnnouncements() {
  return prisma.announcement.findMany({
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });
}

export async function getAdminAnnouncementById(id) {
  return prisma.announcement.findUnique({ where: { id } });
}

export async function getActiveAnnouncement({ locale, pageKey, cookieStore }) {
  if (!routing.locales.includes(locale)) return null;

  const now = new Date();
  const announcements = await prisma.announcement.findMany({
    where: { isEnabled: true },
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });

  const active = announcements.find((announcement) => {
    if (!isScheduled(announcement.startAt, announcement.endAt, now)) return false;
    if (!isTargeted(announcement, pageKey)) return false;
    if (cookieStore?.get(`${ANNOUNCEMENT_COOKIE_PREFIX}-${announcement.id}`)) {
      return false;
    }
    return true;
  });

  if (!active) return null;

  const message = locale === "de" ? active.messageDe : active.messageEn;
  const href = locale === "de" ? active.linkDe : active.linkEn;

  return {
    id: active.id,
    name: active.name,
    frequency: active.frequency,
    openInNewTab: active.openInNewTab,
    message,
    href: href || null,
  };
}
