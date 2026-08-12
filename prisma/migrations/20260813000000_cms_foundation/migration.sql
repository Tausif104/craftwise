
-- CreateEnum
CREATE TYPE "PublishState" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'UNPUBLISH', 'RESTORE', 'LOGIN', 'EXPORT', 'SETTINGS_CHANGE');

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('CONTACT', 'CONSULTING', 'DEMO', 'WAITLIST', 'OTHER');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST', 'CLOSED');

-- CreateEnum
CREATE TYPE "MessageDirection" AS ENUM ('OUTBOUND', 'INBOUND', 'NOTE');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('QUEUED', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "EmailTemplateKey" AS ENUM ('FIRST_REPLY', 'FOLLOW_UP', 'DEMO_LINK', 'CONSULTING_REPLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'RETRYING', 'DELIVERED', 'FAILED');

-- CreateEnum
CREATE TYPE "IntegrationStatus" AS ENUM ('CONNECTED', 'ERROR', 'NOT_CONFIGURED');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryKey" TEXT,
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'de',
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "scheduledFor" TIMESTAMP(3),
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "translationKey" TEXT;

-- CreateTable
CREATE TABLE "EarlyAccessSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'de',
    "consentTerms" BOOLEAN NOT NULL DEFAULT false,
    "consentPrivacy" BOOLEAN NOT NULL DEFAULT false,
    "consentMarketing" BOOLEAN NOT NULL DEFAULT false,
    "confirmationToken" TEXT,
    "confirmedAt" TIMESTAMP(3),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "source" TEXT,
    "unsubscribedAt" TIMESTAMP(3),
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "landingPage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EarlyAccessSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentVersion" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "payload" JSONB NOT NULL,
    "changeNote" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorEmail" TEXT,
    "action" "AuditAction" NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "entityLabel" TEXT,
    "previouses" JSONB,
    "next" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingPlan" (
    "id" TEXT NOT NULL,
    "planKey" TEXT NOT NULL,
    "nameDe" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descriptionDe" TEXT,
    "descriptionEn" TEXT,
    "monthlyPrice" DECIMAL(10,2) NOT NULL,
    "annualPrice" DECIMAL(10,2) NOT NULL,
    "priceNoteDe" TEXT,
    "priceNoteEn" TEXT,
    "ctaLabelDe" TEXT,
    "ctaLabelEn" TEXT,
    "ctaHref" TEXT,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "PublishState" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanFeature" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "labelDe" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlanFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "roleDe" TEXT,
    "roleEn" TEXT,
    "quoteDe" TEXT NOT NULL,
    "quoteEn" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "avatarUrl" TEXT,
    "reviewedOn" TIMESTAMP(3),
    "status" "PublishState" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialPlacement" (
    "id" TEXT NOT NULL,
    "testimonialId" TEXT NOT NULL,
    "pageKey" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TestimonialPlacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqCategory" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "nameDe" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FaqCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqItem" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT,
    "questionDe" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "answerDe" TEXT NOT NULL,
    "answerEn" TEXT NOT NULL,
    "status" "PublishState" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqPlacement" (
    "id" TEXT NOT NULL,
    "faqItemId" TEXT NOT NULL,
    "pageKey" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FaqPlacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT,
    "bytes" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "altTextDe" TEXT,
    "altTextEn" TEXT,
    "folder" TEXT,
    "uploadedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaUsage" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "field" TEXT,

    CONSTRAINT "MediaUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "type" "LeadType" NOT NULL DEFAULT 'OTHER',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "message" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'de',
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "consentAt" TIMESTAMP(3),
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "landingPage" TEXT,
    "referrer" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "internalNotes" TEXT,
    "tags" TEXT[],
    "lastActivityAt" TIMESTAMP(3),
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadMessage" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "direction" "MessageDirection" NOT NULL DEFAULT 'OUTBOUND',
    "status" "MessageStatus" NOT NULL DEFAULT 'QUEUED',
    "subject" TEXT,
    "bodyHtml" TEXT,
    "bodyText" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'de',
    "fromAddress" TEXT,
    "toAddress" TEXT,
    "templateId" TEXT,
    "errorText" TEXT,
    "sentAt" TIMESTAMP(3),
    "senderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailTemplate" (
    "id" TEXT NOT NULL,
    "templateKey" "EmailTemplateKey" NOT NULL DEFAULT 'CUSTOM',
    "name" TEXT NOT NULL,
    "subjectDe" TEXT NOT NULL,
    "subjectEn" TEXT NOT NULL,
    "bodyDe" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "status" "PublishState" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationDelivery" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "target" TEXT NOT NULL,
    "status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 5,
    "nextAttemptAt" TIMESTAMP(3),
    "lastError" TEXT,
    "payload" JSONB,
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeoSetting" (
    "id" TEXT NOT NULL,
    "pathKey" TEXT NOT NULL,
    "isSiteDefault" BOOLEAN NOT NULL DEFAULT false,
    "metaTitleDe" VARCHAR(160),
    "metaTitleEn" VARCHAR(160),
    "metaDescriptionDe" VARCHAR(320),
    "metaDescriptionEn" VARCHAR(320),
    "ogTitleDe" TEXT,
    "ogTitleEn" TEXT,
    "ogDescriptionDe" TEXT,
    "ogDescriptionEn" TEXT,
    "ogImageUrl" TEXT,
    "canonicalUrl" TEXT,
    "noIndex" BOOLEAN NOT NULL DEFAULT false,
    "noFollow" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeoSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackingSetting" (
    "id" TEXT NOT NULL,
    "environment" TEXT NOT NULL DEFAULT 'production',
    "ga4MeasurementId" TEXT,
    "ga4PropertyId" TEXT,
    "gtmContainerId" TEXT,
    "consentRequired" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackingSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'NOT_CONFIGURED',
    "lastSyncAt" TIMESTAMP(3),
    "lastCheckedAt" TIMESTAMP(3),
    "lastError" TEXT,
    "credentialHint" TEXT,
    "configUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EarlyAccessSubscriber_email_key" ON "EarlyAccessSubscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EarlyAccessSubscriber_confirmationToken_key" ON "EarlyAccessSubscriber"("confirmationToken");

-- CreateIndex
CREATE INDEX "early_access_confirmed_idx" ON "EarlyAccessSubscriber"("confirmedAt");

-- CreateIndex
CREATE INDEX "early_access_unsubscribed_idx" ON "EarlyAccessSubscriber"("unsubscribedAt");

-- CreateIndex
CREATE INDEX "content_version_entity_idx" ON "ContentVersion"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "content_version_unique" ON "ContentVersion"("entityType", "entityId", "versionNumber");

-- CreateIndex
CREATE INDEX "audit_entity_idx" ON "AuditLog"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_actor_idx" ON "AuditLog"("actorId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_action_idx" ON "AuditLog"("action", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PricingPlan_planKey_key" ON "PricingPlan"("planKey");

-- CreateIndex
CREATE INDEX "pricing_plan_status_idx" ON "PricingPlan"("status", "sortOrder");

-- CreateIndex
CREATE INDEX "plan_feature_order_idx" ON "PlanFeature"("planId", "sortOrder");

-- CreateIndex
CREATE INDEX "testimonial_status_idx" ON "Testimonial"("status", "sortOrder");

-- CreateIndex
CREATE INDEX "testimonial_placement_page_idx" ON "TestimonialPlacement"("pageKey", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "testimonial_placement_unique" ON "TestimonialPlacement"("testimonialId", "pageKey");

-- CreateIndex
CREATE UNIQUE INDEX "FaqCategory_key_key" ON "FaqCategory"("key");

-- CreateIndex
CREATE INDEX "faq_item_status_idx" ON "FaqItem"("status", "sortOrder");

-- CreateIndex
CREATE INDEX "faq_placement_page_idx" ON "FaqPlacement"("pageKey", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "faq_placement_unique" ON "FaqPlacement"("faqItemId", "pageKey");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_url_key" ON "MediaAsset"("url");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_publicId_key" ON "MediaAsset"("publicId");

-- CreateIndex
CREATE INDEX "media_folder_idx" ON "MediaAsset"("folder", "createdAt");

-- CreateIndex
CREATE INDEX "media_usage_entity_idx" ON "MediaUsage"("entityType", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "media_usage_unique" ON "MediaUsage"("assetId", "entityType", "entityId", "field");

-- CreateIndex
CREATE INDEX "lead_status_idx" ON "Lead"("status", "createdAt");

-- CreateIndex
CREATE INDEX "lead_type_idx" ON "Lead"("type", "createdAt");

-- CreateIndex
CREATE INDEX "lead_email_idx" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "lead_message_thread_idx" ON "LeadMessage"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "lead_message_status_idx" ON "LeadMessage"("status", "createdAt");

-- CreateIndex
CREATE INDEX "email_template_status_idx" ON "EmailTemplate"("status", "sortOrder");

-- CreateIndex
CREATE INDEX "delivery_queue_idx" ON "IntegrationDelivery"("status", "nextAttemptAt");

-- CreateIndex
CREATE UNIQUE INDEX "SeoSetting_pathKey_key" ON "SeoSetting"("pathKey");

-- CreateIndex
CREATE UNIQUE INDEX "TrackingSetting_environment_key" ON "TrackingSetting"("environment");

-- CreateIndex
CREATE UNIQUE INDEX "Integration_key_key" ON "Integration"("key");

-- CreateIndex
CREATE INDEX "post_locale_status_idx" ON "Post"("locale", "status", "createdAt");

-- CreateIndex
CREATE INDEX "post_translation_idx" ON "Post"("translationKey");

-- CreateIndex
CREATE INDEX "post_scheduled_idx" ON "Post"("scheduledFor");

-- AddForeignKey
ALTER TABLE "ContentVersion" ADD CONSTRAINT "ContentVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanFeature" ADD CONSTRAINT "PlanFeature_planId_fkey" FOREIGN KEY ("planId") REFERENCES "PricingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialPlacement" ADD CONSTRAINT "TestimonialPlacement_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaqItem" ADD CONSTRAINT "FaqItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FaqCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaqPlacement" ADD CONSTRAINT "FaqPlacement_faqItemId_fkey" FOREIGN KEY ("faqItemId") REFERENCES "FaqItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaUsage" ADD CONSTRAINT "MediaUsage_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "MediaAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadMessage" ADD CONSTRAINT "LeadMessage_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadMessage" ADD CONSTRAINT "LeadMessage_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "EmailTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadMessage" ADD CONSTRAINT "LeadMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationDelivery" ADD CONSTRAINT "IntegrationDelivery_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

