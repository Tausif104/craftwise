import LegalDocumentPage from '@/components/shared/legal-document-page'
import { getPublishedLegalDocument, getLegalDocumentFallback } from '@/lib/legal-documents'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const legalDocument =
    (await getPublishedLegalDocument('DATA_PROCESSING', locale)) ||
    getLegalDocumentFallback('DATA_PROCESSING', locale)
  const version = legalDocument?.currentPublishedVersion
  return {
    title: version?.metaTitle || version?.title || 'Data Processing Agreement',
    description: version?.metaDescription || '',
  }
}

export default async function DataProcessingPage({ params }) {
  const { locale } = await params
  const legalDocument =
    (await getPublishedLegalDocument('DATA_PROCESSING', locale)) ||
    getLegalDocumentFallback('DATA_PROCESSING', locale)

  return <LegalDocumentPage document={legalDocument} locale={locale} />
}
