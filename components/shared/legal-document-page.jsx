import sanitizeHtml from "sanitize-html";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/global/Hero";
import PageLayout from "@/components/global/page-layout";
import LegalPrintButton from "@/components/shared/legal-print-button";

const SANITIZE_OPTIONS = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "h1",
    "h2",
    "img",
    "u",
    "s",
    "sup",
    "sub",
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    "*": ["class", "id", "style"],
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https", "data"] },
};

function sanitize(html) {
  return sanitizeHtml(html || "", SANITIZE_OPTIONS);
}

function formatLastUpdated(date, locale) {
  if (!date) return null;

  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    dateStyle: "long",
  }).format(new Date(date));
}

function getLastUpdatedLabel(locale) {
  return locale === "de" ? "Zuletzt aktualisiert" : "Last updated";
}

export default async function LegalDocumentPage({ document, locale, semiTitleClass, descClass }) {
  const t = await getTranslations({ locale, namespace: "Nav" });
  const version = document.currentPublishedVersion;
  const config = version.config;
  const sanitizedHeroDescription = sanitize(version.heroDescription);
  const sanitizedBodyHtml = sanitize(version.bodyHtml);
  const lastUpdated = formatLastUpdated(version.publishedAt || version.updatedAt, locale);

  return (
    <PageLayout ctaData={null} pageKey={config.pageKey} locale={locale}>
      <Hero
        pageName={version.title}
        title={[{ text: version.heroTitle, primary: false }]}
        descClass={descClass}
        description={sanitizedHeroDescription}
        image={version.heroImage || config.image}
        imgMr={
          config.pageKey === "/data-processing"
            ? "!ml-[-15px] lg:!ml-0 lg:mr-0 2xl:mr-0"
            : "lg:mr-0 2xl:mr-0"
        }
        slug={t("home")}
        slugLink={`/${locale}`}
        descJson
      />

      <section id={config.allowPrint ? "printable-content" : undefined} className="sec-padding-top sec-padding-bottom">
        <div className="container">
          {lastUpdated ? (
            <div className="mb-6 flex justify-end">
              <div className="rounded-full border border-[#E6EEF7] bg-[#F8FBFF] px-4 py-2 text-sm text-[#475467]">
                {getLastUpdatedLabel(locale)}: {lastUpdated}
              </div>
            </div>
          ) : null}

          <div
            className="legal-doc rounded-[30px] border border-[#C9D6F3] bg-white p-6 md:p-7"
            dangerouslySetInnerHTML={{ __html: sanitizedBodyHtml }}
          />

          {config.allowPrint ? (
            <LegalPrintButton
              title={version.title}
              fileName={version.title}
              downloadLabel={locale === "de" ? "Herunterladen" : "Download"}
              loadingLabel={locale === "de" ? "Wird erstellt…" : "Generating…"}
            />
          ) : null}
        </div>
      </section>
    </PageLayout>
  );
}
