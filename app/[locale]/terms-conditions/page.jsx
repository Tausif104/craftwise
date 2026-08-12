import LegalDocumentPage from '@/components/shared/legal-document-page'
import { getPublishedLegalDocument, getLegalDocumentFallback } from '@/lib/legal-documents'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const legalDocument =
    (await getPublishedLegalDocument('TERMS_CONDITIONS', locale)) ||
    getLegalDocumentFallback('TERMS_CONDITIONS', locale)
  const version = legalDocument?.currentPublishedVersion
  return {
    title: version?.metaTitle || version?.title || 'Terms & Conditions',
    description: version?.metaDescription || '',
  }
}

export default async function TermsConditions({ params }) {
  const { locale } = await params
  const legalDocument =
    (await getPublishedLegalDocument('TERMS_CONDITIONS', locale)) ||
    getLegalDocumentFallback('TERMS_CONDITIONS', locale)

  return <LegalDocumentPage document={legalDocument} locale={locale} />
}
