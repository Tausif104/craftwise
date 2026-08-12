import { getTranslations } from 'next-intl/server'
import BusinessPartner from '@/components/business-partner'
import ChooseCraftwise from '@/components/choose-craftwise'
import PageLayout from '@/components/global/page-layout'
import MainBanner from '@/components/main-banner'
import ProcessSection from '@/components/process-steps'
import SecureSection from '@/components/secure'
import FAQ from '@/components/shared/faq'
import SmartFeaturesSection from '@/components/SmartFeaturesSection'
import TestimonialSection from "@/components/shared/testimonials-section";
import { ctaData } from '@/data/ctaData'
import { testimonialsHome } from '@/data/testimonials'
import { getLocalizedAlternates } from '@/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: getLocalizedAlternates({ locale, href: '/' }),
  }
}

export default async function Home({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Home' })
  const tT = await getTranslations({ locale, namespace: 'TestimonialsHome' })
  const tFaq = await getTranslations({ locale, namespace: 'FAQ' })
  const tCta = await getTranslations({ locale, namespace: 'HomeCTA' })

  const translatedCtaData = {
    ...ctaData,
    ...(locale === 'de'
      ? { maxWidth: 'max-w-[760px]', headingClass: 'lg:whitespace-nowrap' }
      : {}),
    title: [
      { text: tCta('titlePart1'), primary: false },
      { text: tCta('titlePart2'), primary: true },
      { text: tCta('titlePart3'), primary: false },
    ],
    semiTitle: tCta('semiTitle'),
    description: tCta('description'),
    primaryBtn: { ...ctaData.primaryBtn, text: tCta('primaryBtn') },
    outlineBtn: { ...ctaData.outlineBtn, text: tCta('outlineBtn') },
  }

  const translatedFaqItems = [1, 2, 3, 4, 5].map((n) => ({
    question: tFaq(`faq${n}Question`),
    answer: tFaq(`faq${n}Answer`),
  }))

  const translatedTestimonialsHome = {
    ...testimonialsHome,
    title: tT('title'),
    items: testimonialsHome.items.map((item) => ({
      ...item,
      date: tT(`card${item.id}Date`),
      text: tT(`card${item.id}Text`),
    })),
  }

  return (
    <PageLayout ctaData={translatedCtaData} pageKey="/" locale={locale}>
      <MainBanner
        title={[
          { text: t('heroTitle1'), primary: false },
          { text: t('heroTitle2'), primary: true },
          { text: t('heroTitle3'), primary: false },
        ]}
        description={t('heroDescription')}
        button={{
          text: t('heroCta'),
          link: '/registration',
        }}
        image={locale === 'de' ? '/images/hero/main_hero_german.webp' : '/images/hero/main-hero.webp'}
        h1Class={locale === 'de' ? 'lg:-mr-[60px]' : ''}
      />
      <ChooseCraftwise />
      <SmartFeaturesSection />
      <ProcessSection />
      <TestimonialSection pageKey="/" locale={locale} data={translatedTestimonialsHome} bg="#F8FBFF" />
      <BusinessPartner />
      <SecureSection />
      <FAQ pageKey="/" locale={locale} faqItems={translatedFaqItems} heading={tFaq('heading')} topPadding />
    </PageLayout>
  )
}
