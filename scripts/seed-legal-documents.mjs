import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";
import { LEGAL_CONTENT } from "../lib/legal-content.js";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/craftwise?schema=public";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const documents = LEGAL_CONTENT;

async function main() {
  const actor =
    (await prisma.user.findFirst({ where: { role: "ADMIN" }, select: { id: true } })) ||
    (await prisma.user.findFirst({ select: { id: true } }));

  if (!actor) {
    throw new Error("No user found. Create an admin or author account before seeding legal documents.");
  }

  for (const documentData of documents) {
    const existing = await prisma.legalDocument.findUnique({
      where: {
        documentKey_locale: {
          documentKey: documentData.key,
          locale: documentData.locale,
        },
      },
      include: {
        versions: {
          select: { id: true },
        },
      },
    });

    if (existing?.versions?.length) {
      console.log(`Skipping ${documentData.key}:${documentData.locale} because versions already exist.`);
      continue;
    }

    const document =
      existing ||
      (await prisma.legalDocument.create({
        data: {
          documentKey: documentData.key,
          locale: documentData.locale,
        },
      }));

    const version = await prisma.legalDocumentVersion.create({
      data: {
        documentId: document.id,
        versionNumber: 1,
        status: "PUBLISHED",
        title: documentData.title,
        metaTitle: documentData.metaTitle,
        metaDescription: documentData.metaDescription,
        heroTitle: documentData.heroTitle,
        heroSemiTitle: documentData.heroSemiTitle || null,
        heroDescription: documentData.heroDescription || null,
        heroImage: documentData.heroImage || null,
        bodyHtml: documentData.bodyHtml,
        changeNote: "Import from CraftWise legal texts update 2026-06-17",
        createdById: actor.id,
        approvedById: actor.id,
        approvedAt: new Date(),
        publishedAt: new Date(),
      },
    });

    await prisma.legalDocument.update({
      where: { id: document.id },
      data: {
        currentPublishedVersionId: version.id,
      },
    });

    console.log(`Seeded ${documentData.key}:${documentData.locale}`);
  }
}

await main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
