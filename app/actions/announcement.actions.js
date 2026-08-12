"use server";

import { auth } from "@/auth";
import { getAdminAnnouncementById, getAdminAnnouncements } from "@/lib/announcements";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function getString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getBoolean(value) {
  return value === "on" || value === "true";
}

function getDateTime(value) {
  const input = getString(value);
  if (!input) return null;
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { success: false, msg: "Forbidden" };
  }
  return { success: true, session };
}

function revalidateAnnouncementPaths() {
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/announcements");
  revalidatePath("/", "layout");
}

export async function listAnnouncementsForDashboard() {
  const guard = await requireAdmin();
  if (!guard.success) return guard;

  try {
    const announcements = await getAdminAnnouncements();
    return { success: true, announcements };
  } catch (error) {
    console.error("listAnnouncementsForDashboard error:", error);
    return { success: false, msg: "Failed to load announcements." };
  }
}

export async function getAnnouncementForDashboard(id) {
  const guard = await requireAdmin();
  if (!guard.success) return guard;

  try {
    const announcement = await getAdminAnnouncementById(id);
    if (!announcement) {
      return { success: false, msg: "Announcement not found." };
    }
    return { success: true, announcement };
  } catch (error) {
    console.error("getAnnouncementForDashboard error:", error);
    return { success: false, msg: "Failed to load announcement." };
  }
}

export async function createAnnouncement(_prevState, formData) {
  const guard = await requireAdmin();
  if (!guard.success) return guard;

  try {
    const name = getString(formData.get("name"));
    const messageDe = getString(formData.get("messageDe"));
    const messageEn = getString(formData.get("messageEn"));
    const linkDe = getString(formData.get("linkDe"));
    const linkEn = getString(formData.get("linkEn"));
    const targetMode = getString(formData.get("targetMode")) || "ALL_PAGES";
    const pageTargets = formData.getAll("pageTargets").map(getString).filter(Boolean);
    const frequency = getString(formData.get("frequency")) || "ALWAYS";
    const priority = Number.parseInt(getString(formData.get("priority")) || "0", 10) || 0;
    const startAt = getDateTime(formData.get("startAt"));
    const endAt = getDateTime(formData.get("endAt"));
    const isEnabled = getBoolean(formData.get("isEnabled"));
    const openInNewTab = getBoolean(formData.get("openInNewTab"));

    if (!name || !messageDe || !messageEn) {
      return { success: false, msg: "Name, German message, and English message are required." };
    }

    if (targetMode === "SELECTED_PAGES" && pageTargets.length === 0) {
      return { success: false, msg: "Choose at least one target page." };
    }

    if (startAt && endAt && startAt > endAt) {
      return { success: false, msg: "Start date must be before end date." };
    }

    await prisma.announcement.create({
      data: {
        name,
        isEnabled,
        priority,
        targetMode,
        pageTargets: targetMode === "SELECTED_PAGES" ? pageTargets : [],
        frequency,
        messageDe,
        messageEn,
        linkDe: linkDe || null,
        linkEn: linkEn || null,
        openInNewTab,
        startAt,
        endAt,
      },
    });

    revalidateAnnouncementPaths();
    return { success: true, msg: "Announcement created." };
  } catch (error) {
    console.error("createAnnouncement error:", error);
    return { success: false, msg: "Failed to create announcement." };
  }
}

export async function updateAnnouncement(_prevState, formData) {
  const guard = await requireAdmin();
  if (!guard.success) return guard;

  try {
    const id = getString(formData.get("id"));
    if (!id) {
      return { success: false, msg: "Announcement id is required." };
    }

    const name = getString(formData.get("name"));
    const messageDe = getString(formData.get("messageDe"));
    const messageEn = getString(formData.get("messageEn"));
    const linkDe = getString(formData.get("linkDe"));
    const linkEn = getString(formData.get("linkEn"));
    const targetMode = getString(formData.get("targetMode")) || "ALL_PAGES";
    const pageTargets = formData.getAll("pageTargets").map(getString).filter(Boolean);
    const frequency = getString(formData.get("frequency")) || "ALWAYS";
    const priority = Number.parseInt(getString(formData.get("priority")) || "0", 10) || 0;
    const startAt = getDateTime(formData.get("startAt"));
    const endAt = getDateTime(formData.get("endAt"));
    const isEnabled = getBoolean(formData.get("isEnabled"));
    const openInNewTab = getBoolean(formData.get("openInNewTab"));

    if (!name || !messageDe || !messageEn) {
      return { success: false, msg: "Name, German message, and English message are required." };
    }

    if (targetMode === "SELECTED_PAGES" && pageTargets.length === 0) {
      return { success: false, msg: "Choose at least one target page." };
    }

    if (startAt && endAt && startAt > endAt) {
      return { success: false, msg: "Start date must be before end date." };
    }

    await prisma.announcement.update({
      where: { id },
      data: {
        name,
        isEnabled,
        priority,
        targetMode,
        pageTargets: targetMode === "SELECTED_PAGES" ? pageTargets : [],
        frequency,
        messageDe,
        messageEn,
        linkDe: linkDe || null,
        linkEn: linkEn || null,
        openInNewTab,
        startAt,
        endAt,
      },
    });

    revalidateAnnouncementPaths();
    revalidatePath(`/dashboard/announcements/${id}`);
    return { success: true, msg: "Announcement updated." };
  } catch (error) {
    console.error("updateAnnouncement error:", error);
    return { success: false, msg: "Failed to update announcement." };
  }
}

export async function deleteAnnouncement(id) {
  const guard = await requireAdmin();
  if (!guard.success) return guard;

  try {
    await prisma.announcement.delete({ where: { id } });
    revalidateAnnouncementPaths();
    return { success: true };
  } catch (error) {
    console.error("deleteAnnouncement error:", error);
    return { success: false, msg: "Failed to delete announcement." };
  }
}
