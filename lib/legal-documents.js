import { prisma } from "@/lib/prisma";
import { LEGAL_DOCUMENTS, LEGAL_DOCUMENT_LOCALES, getLegalDocumentConfig } from "@/lib/legal-document-config";
import { getLegalContent } from "@/lib/legal-content";

// Builds a synthetic published-document shape from the static shared content so
// legal pages can render the same texts (via LegalDocumentPage) when the database
// has no published version.
export function getLegalDocumentFallback(documentKey, locale) {
  const content = getLegalContent(documentKey, locale);
  const config = getLegalDocumentConfig(documentKey);
  if (!content || !config) {
    return null;
  }
  return {
    documentKey,
    locale,
    currentPublishedVersion: { ...content, config },
  };
}

const versionSelect = {
  id: true,
  documentId: true,
  versionNumber: true,
  status: true,
  title: true,
  metaTitle: true,
  metaDescription: true,
  heroTitle: true,
  heroSemiTitle: true,
  heroDescription: true,
  heroImage: true,
  bodyHtml: true,
  changeNote: true,
  sourceVersionId: true,
  createdAt: true,
  updatedAt: true,
  approvedAt: true,
  publishedAt: true,
  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  approvedBy: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
};

export async function getPublishedLegalDocument(documentKey, locale) {
  if (!prisma.legalDocument) {
    return null;
  }

  let document;
  try {
    document = await prisma.legalDocument.findUnique({
      where: {
        documentKey_locale: {
          documentKey,
          locale,
        },
      },
      select: {
        id: true,
        documentKey: true,
        locale: true,
        currentPublishedVersion: {
          select: versionSelect,
        },
      },
    });
  } catch (error) {
    // DB unreachable (e.g. missing/invalid DATABASE_URL on the host).
    // Log the real cause and fall back to the page's static content
    // instead of throwing a 500 for the whole route.
    console.error(
      `[legal-documents] failed to load ${documentKey}/${locale}:`,
      error
    );
    return null;
  }

  if (!document?.currentPublishedVersion) {
    return null;
  }

  return {
    ...document,
    currentPublishedVersion: {
      ...document.currentPublishedVersion,
      config: getLegalDocumentConfig(documentKey),
    },
  };
}

export async function getLegalDocumentWorkspace(documentKey, locale) {
  const config = getLegalDocumentConfig(documentKey);
  if (!config || !LEGAL_DOCUMENT_LOCALES.includes(locale)) {
    return null;
  }

  if (!prisma.legalDocument) {
    return {
      config,
      document: null,
      currentPublishedVersion: null,
      activeDraft: null,
      versions: [],
    };
  }

  const document = await prisma.legalDocument.findUnique({
    where: {
      documentKey_locale: {
        documentKey,
        locale,
      },
    },
    select: {
      id: true,
      documentKey: true,
      locale: true,
      currentPublishedVersionId: true,
      currentPublishedVersion: {
        select: versionSelect,
      },
      versions: {
        select: versionSelect,
        orderBy: [
          { versionNumber: "desc" },
          { createdAt: "desc" },
        ],
      },
    },
  });

  return {
    config,
    document: document || null,
    currentPublishedVersion: document?.currentPublishedVersion || null,
    activeDraft:
      document?.versions.find(
        (version) => version.status === "DRAFT" || version.status === "PENDING"
      ) || null,
    versions: document?.versions || [],
  };
}

export async function listLegalDocumentWorkspaces() {
  if (!prisma.legalDocument) {
    return LEGAL_DOCUMENTS.flatMap((config) =>
      LEGAL_DOCUMENT_LOCALES.map((locale) => ({
        documentId: null,
        documentKey: config.key,
        label: config.label,
        locale,
        currentPublishedVersion: null,
        activeDraft: null,
        versionCount: 0,
      }))
    );
  }

  const documents = await prisma.legalDocument.findMany({
    select: {
      id: true,
      documentKey: true,
      locale: true,
      currentPublishedVersion: {
        select: {
          id: true,
          versionNumber: true,
          title: true,
          publishedAt: true,
          updatedAt: true,
        },
      },
      versions: {
        select: {
          id: true,
          status: true,
          versionNumber: true,
          updatedAt: true,
        },
        orderBy: [{ versionNumber: "desc" }],
      },
    },
  });

  const byKey = new Map(
    documents.map((document) => [`${document.documentKey}:${document.locale}`, document])
  );

  return LEGAL_DOCUMENTS.flatMap((config) =>
    LEGAL_DOCUMENT_LOCALES.map((locale) => {
      const document = byKey.get(`${config.key}:${locale}`) || null;
      const activeDraft =
        document?.versions.find(
          (version) => version.status === "DRAFT" || version.status === "PENDING"
        ) || null;

      return {
        documentId: document?.id || null,
        documentKey: config.key,
        label: config.label,
        locale,
        currentPublishedVersion: document?.currentPublishedVersion || null,
        activeDraft,
        versionCount: document?.versions.length || 0,
      };
    })
  );
}
