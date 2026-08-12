import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";
import { getLegalContent } from "../lib/legal-content.js";
import { LEGAL_DOCUMENTS, LEGAL_DOCUMENT_LOCALES } from "../lib/legal-document-config.js";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/craftwise?schema=public";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const SYNC_KEYS = ["LEGAL_NOTICE", "PRIVACY_POLICY", "DATA_PROCESSING", "TERMS_CONDITIONS"];
  for (const config of LEGAL_DOCUMENTS.filter((c) => SYNC_KEYS.includes(c.key))) {
    for (const locale of LEGAL_DOCUMENT_LOCALES) {
      const content = getLegalContent(config.key, locale);
      if (!content) {
        console.log(`No static content for ${config.key}:${locale} — skipping`);
        continue;
      }

      const doc = await prisma.legalDocument.findUnique({
        where: { documentKey_locale: { documentKey: config.key, locale } },
        select: { currentPublishedVersionId: true },
      });

      if (!doc?.currentPublishedVersionId) {
        console.log(`No published version for ${config.key}:${locale} — skipping`);
        continue;
      }

      await prisma.legalDocumentVersion.update({
        where: { id: doc.currentPublishedVersionId },
        data: {
          title: content.title,
          metaTitle: content.metaTitle,
          metaDescription: content.metaDescription,
          heroTitle: content.heroTitle,
          heroSemiTitle: content.heroSemiTitle,
          heroDescription: content.heroDescription,
          heroImage: content.heroImage,
          bodyHtml: content.bodyHtml,
          publishedAt: content.publishedAt ? new Date(content.publishedAt) : undefined,
        },
      });

      console.log(`Synced ${config.key}:${locale}`);
    }
  }
}

await main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
