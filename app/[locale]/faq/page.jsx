import { getTranslations } from 'next-intl/server'
import FAQSection from '@/components/faq-page'
import Hero from '@/components/global/Hero'
import PageLayout from '@/components/global/page-layout'
import { ctaFaqData } from '@/data/ctaData'
import { getFaqPageContent } from "@/lib/content-source";


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: 'FAQs ',
    description: t('faqDescription'),
  }
}

export default async function FaqPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'FaqPage' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })
  const tf = await getTranslations({ locale, namespace: 'FaqSection' })
  const tCta = await getTranslations({ locale, namespace: 'FaqCTA' })

  const translatedCtaData = {
    ...ctaFaqData,
    title: [{ text: tCta('heading'), primary: false }],
    description: tCta('description'),
    primaryBtn: { ...ctaFaqData.primaryBtn, text: tCta('primaryCta') },
    contactLabel: tCta('contactLabel'),
    semiDesc: tCta('semiDesc'),
  }

  const faqCategories = [
    { id: 1, name: tf('categories.gettingStarted'), slug: 'getting-started' },
    { id: 2, name: tf('categories.usingCraftwise'), slug: 'using-craftwise' },
    { id: 4, name: tf('categories.isCraftwiseRightForMe'), slug: 'is-craftwise-right-for-me' },
    { id: 5, name: tf('categories.features'), slug: 'features' },
    { id: 3, name: tf('categories.accountBilling'), slug: 'account-billing' },
    { id: 6, name: tf('categories.technicalIssues'), slug: 'technical-issues' },
    { id: 7, name: tf('categories.consultingTraining'), slug: 'consulting-training' },
    { id: 9, name: tf('categories.pricePlan'), slug: 'price-plan' },
  ]

  const buildItems = (key, count) =>
    Array.from({ length: count }, (_, i) => ({
      title: tf(`${key}.q${i + 1}`),
      content: tf(`${key}.a${i + 1}`),
    }))

  const faqData = {
    'getting-started': buildItems('gettingStarted', 7),
    'using-craftwise': buildItems('usingCraftwise', 7),
    'is-craftwise-right-for-me': buildItems('isCraftwiseRightForMe', 7),
    features: buildItems('features', 8),
    'account-billing': buildItems('accountBilling', 7),
    'technical-issues': buildItems('technicalIssues', 7),
    'consulting-training': buildItems('consultingTraining', 7),
    'price-plan': buildItems('pricePlan', 8),
  }

  // CMS-managed when available; the translated content above is the fallback.
  const cms = await getFaqPageContent('/faq', locale)
  const categories = cms?.categories?.length ? cms.categories : faqCategories
  const items = cms?.faqData ? cms.faqData : faqData

  return (
    <PageLayout ctaData={translatedCtaData} pageKey="/faq" locale={locale}>
      <Hero
        pageName={t('pageName')}
        slug={nav('home')}
        slugLink="/"
        title={[
          { text: t('heroTitle1'), primary: false },
          { text: t('heroTitle2'), primary: true },
        ]}
        semiTitle={t('heroSemiTitle')}
        description={t('heroDescription')}
        image="/images/hero/faq.svg"
      />
      <FAQSection
        heading={tf('heading')}
        chooseCategoryPlaceholder={tf('chooseCategoryPlaceholder')}
        categories={categories}
        faqData={items}
      />
    </PageLayout>
  )
}
