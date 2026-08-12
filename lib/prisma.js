import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/craftwise?schema=public";
const adapter = new PrismaPg({ connectionString });

function createPrismaClient() {
  return new PrismaClient({ adapter });
}

/**
 * Models that must exist on a cached client. In dev, Next keeps `global.prisma`
 * across hot reloads, so a client generated before a schema change survives and
 * every new model reads as undefined. Listing the newest models here forces a
 * rebuild instead of failing at the call site with "cannot read 'create'".
 */
const REQUIRED_MODELS = [
  "legalDocument",
  "legalDocumentVersion",
  "lead",
  "leadMessage",
  "emailTemplate",
  "integrationDelivery",
  "auditLog",
  "contentVersion",
  "mediaAsset",
  "pricingPlan",
  "testimonial",
  "faqItem",
  "seoSetting",
  "integration",
];

function isStale(client) {
  return REQUIRED_MODELS.some((model) => !client[model]);
}

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.prisma || isStale(global.prisma)) {
    global.prisma = createPrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
