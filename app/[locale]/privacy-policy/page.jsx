import LegalDocumentPage from '@/components/shared/legal-document-page'
import { getPublishedLegalDocument, getLegalDocumentFallback } from '@/lib/legal-documents'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const legalDocument =
    (await getPublishedLegalDocument('PRIVACY_POLICY', locale)) ||
    getLegalDocumentFallback('PRIVACY_POLICY', locale)
  const version = legalDocument?.currentPublishedVersion
  return {
    title: version?.metaTitle || version?.title || 'Privacy Policy',
    description: version?.metaDescription || '',
  }
}

export default async function PrivacyPolicy({ params }) {
  const { locale } = await params
  const legalDocument =
    (await getPublishedLegalDocument('PRIVACY_POLICY', locale)) ||
    getLegalDocumentFallback('PRIVACY_POLICY', locale)

  return <LegalDocumentPage document={legalDocument} locale={locale} />
}
