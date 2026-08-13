"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getLegalDocumentConfig } from "@/lib/legal-document-config";
import {
  getLegalDocumentWorkspace,
  listLegalDocumentWorkspaces,
} from "@/lib/legal-documents";
import { prisma } from "@/lib/prisma";

function getString(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function requireSession() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: { success: false, msg: "Unauthorized" } };
  }

  return { session };
}

async function requireAdmin() {
  const result = await requireSession();
  if (result.error) return result;

  if (result.session.user.role !== "ADMIN") {
    return { error: { success: false, msg: "Forbidden" } };
  }

  return result;
}

function revalidateLegalDocumentPaths(documentKey, locale) {
  const config = getLegalDocumentConfig(documentKey);
  if (!config) return;

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/legal-pages");
  revalidatePath(`/dashboard/legal-pages/${documentKey}/${locale}`);
  revalidatePath(config.pageKey);
  revalidatePath(`/${locale}${config.pageKey}`);
}

async function getOrCreateDocument(tx, documentKey, locale) {
  const existing = await tx.legalDocument.findUnique({
    where: {
      documentKey_locale: {
        documentKey,
        locale,
      },
    },
  });

  if (existing) return existing;

  return tx.legalDocument.create({
    data: {
      documentKey,
      locale,
    },
  });
}

async function getNextVersionNumber(tx, documentId) {
  const latest = await tx.legalDocumentVersion.findFirst({
    where: { documentId },
    orderBy: { versionNumber: "desc" },
    select: { versionNumber: true },
  });

  return (latest?.versionNumber || 0) + 1;
}

export async function listLegalDocumentsForDashboard() {
  const result = await requireSession();
  if (result.error) return result.error;

  try {
    const documents = await listLegalDocumentWorkspaces();
    return { success: true, documents };
  } catch (error) {
    console.error("listLegalDocumentsForDashboard error:", error);
    return { success: false, msg: "Failed to load legal pages." };
  }
}

export async function getLegalDocumentWorkspaceForDashboard(documentKey, locale) {
  const result = await requireSession();
  if (result.error) return result.error;

  try {
    const workspace = await getLegalDocumentWorkspace(documentKey, locale);
    if (!workspace) {
      return { success: false, msg: "Legal page not found." };
    }

    return { success: true, workspace };
  } catch (error) {
    console.error("getLegalDocumentWorkspaceForDashboard error:", error);
    return { success: false, msg: "Failed to load legal page." };
  }
}

export async function createLegalDocumentDraft({ documentKey, locale, sourceVersionId = null } = {}) {
  const result = await requireSession();
  if (result.error) return result.error;

  try {
    const config = getLegalDocumentConfig(documentKey);
    if (!config || !locale) {
      return { success: false, msg: "Document key and locale are required." };
    }

    const created = await prisma.$transaction(async (tx) => {
      const document = await getOrCreateDocument(tx, documentKey, locale);

      const existingActiveDraft = await tx.legalDocumentVersion.findFirst({
        where: {
          documentId: document.id,
          status: { in: ["DRAFT", "PENDING"] },
        },
        select: { id: true },
      });

      if (existingActiveDraft) {
        return { error: "An active draft already exists for this language." };
      }

      let sourceVersion = null;
      if (sourceVersionId) {
        sourceVersion = await tx.legalDocumentVersion.findFirst({
          where: {
            id: sourceVersionId,
            documentId: document.id,
          },
        });
      } else if (document.currentPublishedVersionId) {
        sourceVersion = await tx.legalDocumentVersion.findUnique({
          where: { id: document.currentPublishedVersionId },
        });
      }

      const versionNumber = await getNextVersionNumber(tx, document.id);
      const version = await tx.legalDocumentVersion.create({
        data: {
          documentId: document.id,
          versionNumber,
          status: "DRAFT",
          title: sourceVersion?.title || config.label,
          metaTitle: sourceVersion?.metaTitle || config.fallbackMetaTitle || config.label,
          metaDescription: sourceVersion?.metaDescription || "",
          heroTitle: sourceVersion?.heroTitle || config.label,
          heroSemiTitle: sourceVersion?.heroSemiTitle || "",
          heroDescription: sourceVersion?.heroDescription || "",
          heroImage: sourceVersion?.heroImage || config.image,
          bodyHtml: sourceVersion?.bodyHtml || "",
          changeNote: sourceVersionId ? `Rollback draft from v${sourceVersion?.versionNumber}` : "",
          sourceVersionId: sourceVersion?.id || null,
          createdById: result.session.user.id,
        },
      });

      return { versionId: version.id };
    });

    if (created.error) {
      return { success: false, msg: created.error };
    }

    revalidateLegalDocumentPaths(documentKey, locale);
    return { success: true, versionId: created.versionId };
  } catch (error) {
    console.error("createLegalDocumentDraft error:", error);
    return { success: false, msg: "Failed to create draft." };
  }
}

export async function saveLegalDocumentDraft(_prevState, formData) {
  const result = await requireSession();
  if (result.error) return result.error;

  try {
    const versionId = getString(formData.get("versionId"));
    const documentKey = getString(formData.get("documentKey"));
    const locale = getString(formData.get("locale"));
    const title = getString(formData.get("title"));
    const metaTitle = getString(formData.get("metaTitle"));
    const metaDescription = getString(formData.get("metaDescription"));
    const heroTitle = getString(formData.get("heroTitle"));
    const heroSemiTitle = getString(formData.get("heroSemiTitle"));
    const heroDescription = getString(formData.get("heroDescription"));
    const heroImage = getString(formData.get("heroImage"));
    const bodyHtml = getString(formData.get("bodyHtml"));
    const changeNote = getString(formData.get("changeNote"));

    if (!versionId || !documentKey || !locale || !title || !heroTitle || !bodyHtml) {
      return { success: false, msg: "Title, hero title, and content are required." };
    }

    const version = await prisma.legalDocumentVersion.findUnique({
      where: { id: versionId },
      include: {
        document: {
          select: {
            documentKey: true,
            locale: true,
          },
        },
      },
    });

    if (!version) {
      return { success: false, msg: "Draft not found." };
    }

    const isAdmin = result.session.user.role === "ADMIN";
    if (!isAdmin && version.createdById !== result.session.user.id) {
      return { success: false, msg: "Forbidden" };
    }

    if (!["DRAFT", "PENDING"].includes(version.status)) {
      return { success: false, msg: "Only active drafts can be edited." };
    }

    await prisma.legalDocumentVersion.update({
      where: { id: versionId },
      data: {
        title,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        heroTitle,
        heroSemiTitle: heroSemiTitle || null,
        heroDescription: heroDescription || null,
        heroImage: heroImage || null,
        bodyHtml,
        changeNote: changeNote || null,
        status: "DRAFT",
      },
    });

    revalidateLegalDocumentPaths(documentKey, locale);
    return { success: true, msg: "Draft saved." };
  } catch (error) {
    console.error("saveLegalDocumentDraft error:", error);
    return { success: false, msg: "Failed to save draft." };
  }
}

/**
 * Discards an unpublished draft.
 *
 * Only DRAFT and PENDING versions can go: published and superseded versions are
 * the legal audit trail and stay put. Drafts cloned from this one keep working
 * because `sourceVersionId` is SetNull.
 */
export async function deleteLegalDocumentDraft(versionId) {
  const result = await requireSession();
  if (result.error) return result.error;

  try {
    const version = await prisma.legalDocumentVersion.findUnique({
      where: { id: versionId },
      include: {
        document: {
          select: {
            documentKey: true,
            locale: true,
            currentPublishedVersionId: true,
          },
        },
      },
    });

    if (!version) {
      return { success: false, msg: "Draft not found." };
    }

    const isAdmin = result.session.user.role === "ADMIN";
    if (!isAdmin && version.createdById !== result.session.user.id) {
      return { success: false, msg: "Forbidden" };
    }

    if (!["DRAFT", "PENDING"].includes(version.status)) {
      return { success: false, msg: "Only drafts can be deleted." };
    }

    if (version.document.currentPublishedVersionId === version.id) {
      return { success: false, msg: "This version is live and cannot be deleted." };
    }

    await prisma.legalDocumentVersion.delete({ where: { id: versionId } });

    revalidateLegalDocumentPaths(version.document.documentKey, version.document.locale);
    return { success: true, msg: `Deleted draft v${version.versionNumber}.` };
  } catch (error) {
    console.error("deleteLegalDocumentDraft error:", error);
    return { success: false, msg: "Failed to delete draft." };
  }
}

export async function submitLegalDocumentDraft(versionId) {
  const result = await requireSession();
  if (result.error) return result.error;

  try {
    const version = await prisma.legalDocumentVersion.findUnique({
      where: { id: versionId },
      include: {
        document: {
          select: {
            documentKey: true,
            locale: true,
          },
        },
      },
    });

    if (!version) {
      return { success: false, msg: "Draft not found." };
    }

    const isAdmin = result.session.user.role === "ADMIN";
    if (!isAdmin && version.createdById !== result.session.user.id) {
      return { success: false, msg: "Forbidden" };
    }

    if (!["DRAFT", "PENDING"].includes(version.status)) {
      return { success: false, msg: "Only active drafts can be submitted." };
    }

    await prisma.legalDocumentVersion.update({
      where: { id: versionId },
      data: { status: "PENDING" },
    });

    revalidateLegalDocumentPaths(version.document.documentKey, version.document.locale);
    return { success: true, msg: "Draft submitted for approval." };
  } catch (error) {
    console.error("submitLegalDocumentDraft error:", error);
    return { success: false, msg: "Failed to submit draft." };
  }
}

export async function publishLegalDocumentVersion(versionId) {
  const result = await requireAdmin();
  if (result.error) return result.error;

  try {
    const published = await prisma.$transaction(async (tx) => {
      const version = await tx.legalDocumentVersion.findUnique({
        where: { id: versionId },
        include: {
          document: true,
        },
      });

      if (!version) {
        return { error: "Version not found." };
      }

      if (!["DRAFT", "PENDING", "PUBLISHED"].includes(version.status)) {
        return { error: "This version cannot be published." };
      }

      await tx.legalDocumentVersion.updateMany({
        where: {
          documentId: version.documentId,
          status: "PUBLISHED",
          id: { not: version.id },
        },
        data: {
          status: "SUPERSEDED",
        },
      });

      const updatedVersion = await tx.legalDocumentVersion.update({
        where: { id: version.id },
        data: {
          status: "PUBLISHED",
          approvedById: result.session.user.id,
          approvedAt: new Date(),
          publishedAt: new Date(),
        },
      });

      await tx.legalDocument.update({
        where: { id: version.documentId },
        data: {
          currentPublishedVersionId: version.id,
        },
      });

      return {
        documentKey: version.document.documentKey,
        locale: version.document.locale,
        version: updatedVersion,
      };
    });

    if (published.error) {
      return { success: false, msg: published.error };
    }

    revalidateLegalDocumentPaths(published.documentKey, published.locale);
    return {
      success: true,
      msg: `Published v${published.version.versionNumber}.`,
    };
  } catch (error) {
    console.error("publishLegalDocumentVersion error:", error);
    return { success: false, msg: "Failed to publish version." };
  }
}
