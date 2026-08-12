export const LEGAL_DOCUMENTS = [
  {
    key: "PRIVACY_POLICY",
    label: "Privacy Policy",
    pageKey: "/privacy-policy",
    dashboardHref: "/dashboard/legal-pages/PRIVACY_POLICY",
    image: "/images/thumbs/privacy-policy.svg",
    fallbackMetaTitle: "Privacy Policy",
    allowPrint: true,
  },
  {
    key: "TERMS_CONDITIONS",
    label: "Terms & Conditions",
    pageKey: "/terms-conditions",
    dashboardHref: "/dashboard/legal-pages/TERMS_CONDITIONS",
    image: "/images/thumbs/terms.svg",
    fallbackMetaTitle: "Terms & Conditions",
    allowPrint: true,
  },
  {
    key: "LEGAL_NOTICE",
    label: "Imprint / Legal Notice",
    pageKey: "/legal-notice",
    dashboardHref: "/dashboard/legal-pages/LEGAL_NOTICE",
    image: "/images/thumbs/legal-notice.svg",
    fallbackMetaTitle: "Legal Notice",
    allowPrint: true,
  },
  {
    key: "DATA_PROCESSING",
    label: "DPA Summary",
    pageKey: "/data-processing",
    dashboardHref: "/dashboard/legal-pages/DATA_PROCESSING",
    image: "/images/data-processing/hero.svg",
    fallbackMetaTitle: "Data Processing Agreement",
    allowPrint: true,
  },
];

export const LEGAL_DOCUMENT_LOCALES = ["de", "en"];

export function getLegalDocumentConfig(documentKey) {
  return LEGAL_DOCUMENTS.find((document) => document.key === documentKey) || null;
}
