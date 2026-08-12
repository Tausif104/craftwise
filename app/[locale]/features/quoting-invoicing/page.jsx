import { getTranslations } from 'next-intl/server'
import Hero from '@/components/global/Hero'
import PageLayout from '@/components/global/page-layout'
import BenifitsFeatures from '@/components/shared/benifits-features'
import ChallengeSolution from '@/components/shared/challenge-solution'
import FAQ from '@/components/shared/faq'
import FeaturesHowItWorks from '@/components/shared/features-how-it-works'
import RealUseInDailyWorkSection from '@/components/shared/real-work'
import TestimonialSection from "@/components/shared/testimonials-section";
import { quotingChallengeSolutionData } from '@/data/challengeSolutionData'
import { quotingFeatureBenefitsData } from '@/data/featureBenefitsData'
import { quotingfeaturesHowItWorksData } from '@/data/featuresHowItWorksData'
import { quotingRealUseDailyWork } from '@/data/realUseDailyWork'
import { fQItestimonials } from '@/data/testimonials'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'QuotingInvoicing' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })
  return {
    title: nav('quotingInvoicing'),
    description: t('heroDescription'),
  }
}

export default async function QuotingInvoicingPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'QuotingInvoicing' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })

  const fhiwData = {
    ...quotingfeaturesHowItWorksData,
    video: quotingfeaturesHowItWorksData.video[locale === 'de' ? 'de' : 'en'],
    title: t('fhiwTitle'),
    description: t('fhiwDescription'),
    items: [t('fhiwItem1'), t('fhiwItem2'), t('fhiwItem3'), t('fhiwItem4')],
  }

  const ctaData = {
    title: [{ text: t('ctaTitle'), primary: false }],
    description: t('ctaDescription'),
    primaryBtn: { text: t('ctaPrimaryBtn'), link: '/registration' },
    outlineBtn: { text: t('ctaOutlineBtn'), link: `/${locale}/book-demo` },
    ...(locale === 'de'
      ? {
          maxWidth: 'max-w-[760px]',
          headingClass: 'lg:whitespace-pre',
          descMaxWidth: 'max-w-[820px]',
          descClass: 'lg:whitespace-pre',
        }
      : {}),
  }

  const rudwData = {
    ...quotingRealUseDailyWork,
    title: t('rudwTitle'),
    subtitle: t('rudwSubtitle'),
    illustration:
      locale === 'de'
        ? { ...quotingRealUseDailyWork.illustration, src: '/images/german/quotioning-daily-g.svg' }
        : quotingRealUseDailyWork.illustration,
    steps: quotingRealUseDailyWork.steps.map((step, i) => ({
      ...step,
      title: t(`rudwStep${i + 1}Title`),
      description: t(`rudwStep${i + 1}Text`),
    })),
  }

  const bfData = {
    ...quotingFeatureBenefitsData,
    heading: t('bfHeading'),
    description: t('bfDescription'),
    items: quotingFeatureBenefitsData.items.map((item, i) => ({
      ...item,
      title: t(`bfCard${i + 1}Title`),
      text: t(`bfCard${i + 1}Text`),
    })),
  }

  const csData = {
    ...quotingChallengeSolutionData,
    title: { normal: t('csTitleNormal'), highlight: t('csTitleHighlight') },
    challenge: {
      title: t('csChallengeTitle'),
      items: [t('csChallenge1'), t('csChallenge2'), t('csChallenge3'), t('csChallenge4'), t('csChallenge5')],
    },
    solution: {
      title: t('csSolutionTitle'),
      items: [t('csSolution1'), t('csSolution2'), t('csSolution3'), t('csSolution4'), t('csSolution5')],
    },
  }

  return (
    <PageLayout ctaData={ctaData} pageKey="/features/quoting-invoicing" locale={locale}>
      <Hero
        pageName={nav('quotingInvoicing')}
        slug={nav('features')}
        slugLink={`/${locale}/features`}
        title={[
          { text: t('heroTitle1'), primary: false },
          { text: t('heroTitle2'), primary: false, newLine: locale === 'de' },
        ]}
        button={{ text: t('heroCta'), link: '/registration' }}
        description={t('heroDescription')}
        image={locale === 'de' ? '/images/german/quotioning-hero-g.svg' : '/images/hero/f_quoting.svg'}
      />
      <FeaturesHowItWorks data={fhiwData} />
      <ChallengeSolution data={csData} />
      <BenifitsFeatures data={bfData} />
      <RealUseInDailyWorkSection {...rudwData} />
      <TestimonialSection pageKey="/features/quoting-invoicing" locale={locale}         heading={t('testimonialHeading')}
        subtext={t('testimonialSubtext')}
        data={{
          items: fQItestimonials.items.map((item, i) => ({
            ...item,
            text: t(`testimonial${i + 1}Text`),
            role: t(`testimonial${i + 1}Role`),
            date: t(`testimonial${i + 1}Date`),
          })),
        }}
      />
      <FAQ pageKey="/features/quoting-invoicing" locale={locale}         heading={t('faqHeading')}
        faqItems={[
          { question: t('faq1Question'), answer: t('faq1Answer') },
          { question: t('faq2Question'), answer: t('faq2Answer') },
          { question: t('faq3Question'), answer: t('faq3Answer') },
          { question: t('faq4Question'), answer: t('faq4Answer') },
          { question: t('faq5Question'), answer: t('faq5Answer') },
          { question: t('faq6Question'), answer: t('faq6Answer') },
        ]}
      />
    </PageLayout>
  )
}
