
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."AnnouncementFrequency" AS ENUM ('ALWAYS', 'ONCE', 'ONCE_PER_SESSION');

-- CreateEnum
CREATE TYPE "public"."AnnouncementTargetMode" AS ENUM ('ALL_PAGES', 'SELECTED_PAGES');

-- CreateEnum
CREATE TYPE "public"."LegalDocumentKey" AS ENUM ('PRIVACY_POLICY', 'TERMS_CONDITIONS', 'LEGAL_NOTICE', 'DATA_PROCESSING');

-- CreateEnum
CREATE TYPE "public"."LegalDocumentStatus" AS ENUM ('DRAFT', 'PENDING', 'PUBLISHED', 'SUPERSEDED');

-- CreateEnum
CREATE TYPE "public"."PostStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'AUTHOR');

-- CreateTable
CREATE TABLE "public"."Announcement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "targetMode" "public"."AnnouncementTargetMode" NOT NULL DEFAULT 'ALL_PAGES',
    "pageTargets" TEXT[],
    "frequency" "public"."AnnouncementFrequency" NOT NULL DEFAULT 'ALWAYS',
    "messageDe" VARCHAR(240) NOT NULL,
    "messageEn" VARCHAR(240) NOT NULL,
    "linkDe" VARCHAR(500),
    "linkEn" VARCHAR(500),
    "openInNewTab" BOOLEAN NOT NULL DEFAULT false,
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "impressionCount" INTEGER NOT NULL DEFAULT 0,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "lastImpressionAt" TIMESTAMP(3),
    "lastClickAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LegalDocument" (
    "id" TEXT NOT NULL,
    "documentKey" "public"."LegalDocumentKey" NOT NULL,
    "locale" TEXT NOT NULL,
    "currentPublishedVersionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LegalDocumentVersion" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "status" "public"."LegalDocumentStatus" NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "metaTitle" VARCHAR(160),
    "metaDescription" VARCHAR(200),
    "heroTitle" TEXT NOT NULL,
    "heroSemiTitle" TEXT,
    "heroDescription" TEXT,
    "heroImage" TEXT,
    "bodyHtml" TEXT NOT NULL,
    "changeNote" TEXT,
    "sourceVersionId" TEXT,
    "createdById" TEXT NOT NULL,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalDocumentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "postSlug" TEXT NOT NULL,
    "excerpt" TEXT,
    "bannerImage" TEXT NOT NULL,
    "bannerAltText" TEXT,
    "metaTitle" VARCHAR(160),
    "metaDescription" VARCHAR(200),
    "canonicalUrl" TEXT,
    "content" TEXT NOT NULL,
    "status" "public"."PostStatus" NOT NULL DEFAULT 'DRAFT',
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "profileImage" TEXT,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'AUTHOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "announcement_active_idx" ON "public"."Announcement"("isEnabled" ASC, "startAt" ASC, "endAt" ASC);

-- CreateIndex
CREATE INDEX "announcement_priority_idx" ON "public"."Announcement"("priority" ASC, "createdAt" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocument_currentPublishedVersionId_key" ON "public"."LegalDocument"("currentPublishedVersionId" ASC);

-- CreateIndex
CREATE INDEX "legal_document_key_locale_idx" ON "public"."LegalDocument"("documentKey" ASC, "locale" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "legal_document_key_locale_unique" ON "public"."LegalDocument"("documentKey" ASC, "locale" ASC);

-- CreateIndex
CREATE INDEX "legal_document_status_created_idx" ON "public"."LegalDocumentVersion"("documentId" ASC, "status" ASC, "createdAt" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "legal_document_version_unique" ON "public"."LegalDocumentVersion"("documentId" ASC, "versionNumber" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Post_postSlug_key" ON "public"."Post"("postSlug" ASC);

-- CreateIndex
CREATE INDEX "author_idx" ON "public"."Post"("authorId" ASC);

-- CreateIndex
CREATE INDEX "status_created_idx" ON "public"."Post"("status" ASC, "createdAt" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email" ASC);

-- AddForeignKey
ALTER TABLE "public"."LegalDocument" ADD CONSTRAINT "LegalDocument_currentPublishedVersionId_fkey" FOREIGN KEY ("currentPublishedVersionId") REFERENCES "public"."LegalDocumentVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LegalDocumentVersion" ADD CONSTRAINT "LegalDocumentVersion_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LegalDocumentVersion" ADD CONSTRAINT "LegalDocumentVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LegalDocumentVersion" ADD CONSTRAINT "LegalDocumentVersion_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "public"."LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LegalDocumentVersion" ADD CONSTRAINT "LegalDocumentVersion_sourceVersionId_fkey" FOREIGN KEY ("sourceVersionId") REFERENCES "public"."LegalDocumentVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

