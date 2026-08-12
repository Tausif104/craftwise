import LegalDocumentPage from '@/components/shared/legal-document-page'
import { getPublishedLegalDocument, getLegalDocumentFallback } from '@/lib/legal-documents'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const legalDocument =
    (await getPublishedLegalDocument('LEGAL_NOTICE', locale)) ||
    getLegalDocumentFallback('LEGAL_NOTICE', locale)
  const version = legalDocument?.currentPublishedVersion
  return {
    title: version?.metaTitle || version?.title || 'Legal Notice',
    description: version?.metaDescription || 'CraftWise GmbH, Ulmenweg 12, 64331 Weiterstadt, Germany',
  }
}

export default async function LegalNotice({ params }) {
  const { locale } = await params
  const legalDocument =
    (await getPublishedLegalDocument('LEGAL_NOTICE', locale)) ||
    getLegalDocumentFallback('LEGAL_NOTICE', locale)

  return <LegalDocumentPage document={legalDocument} locale={locale} semiTitleClass="lg:text-[18px]" descClass="text-[18px] lg:text-[18px]" />
}
