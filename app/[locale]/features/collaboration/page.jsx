import { getTranslations } from 'next-intl/server'
import Hero from '@/components/global/Hero'
import PageLayout from '@/components/global/page-layout'
import BenifitsFeatures from '@/components/shared/benifits-features'
import ChallengeSolution from '@/components/shared/challenge-solution'
import FAQ from '@/components/shared/faq'
import FeaturesHowItWorks from '@/components/shared/features-how-it-works'
import RealUseInDailyWorkSection from '@/components/shared/real-work'
import TestimonialSection from "@/components/shared/testimonials-section";
import { collaborationChallengeSolutionData } from '@/data/challengeSolutionData'
import { collaborationFeatureBenefitsData } from '@/data/featureBenefitsData'
import { collaborationfeaturesHowItWorksData } from '@/data/featuresHowItWorksData'
import { collaborationRealUseDailyWork } from '@/data/realUseDailyWork'
import { fCLtestimonials } from '@/data/testimonials'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Collaboration' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })
  return {
    title: nav('collaboration'),
    description: t('heroDescription'),
  }
}

export default async function CollaborationPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Collaboration' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })

  const ctaData = {
    title: [{ text: t('ctaTitle'), primary: false }],
    description: t('ctaDescription'),
    ...(locale === 'de'
      ? {
          maxWidth: 'max-w-[860px]',
          headingClass: 'lg:whitespace-nowrap',
          descMaxWidth: 'max-w-[820px]',
          descClass: 'lg:whitespace-pre',
        }
      : {}),
    primaryBtn: { text: t('ctaPrimaryBtn'), link: '/registration' },
    outlineBtn: { text: t('ctaOutlineBtn'), link: `/${locale}/book-demo` },
  }

  const fhiwData = {
    ...collaborationfeaturesHowItWorksData,
    video: collaborationfeaturesHowItWorksData.video[locale === 'de' ? 'de' : 'en'],
    title: t('fhiwTitle'),
    description: t('fhiwDescription'),
    descriptionTwo: t('fhiwDescriptionTwo'),
    items: [t('fhiwItem1'), t('fhiwItem2'), t('fhiwItem3'), t('fhiwItem4')],
  }

  const rudwData = {
    ...collaborationRealUseDailyWork,
    title: t('rudwTitle'),
    subtitle: t('rudwSubtitle'),
    steps: collaborationRealUseDailyWork.steps.map((step, i) => ({
      ...step,
      title: t(`rudwStep${i + 1}Title`),
      description: t(`rudwStep${i + 1}Text`),
    })),
  }

  const bfData = {
    ...collaborationFeatureBenefitsData,
    heading: t('bfHeading'),
    description: t('bfDescription'),
    items: collaborationFeatureBenefitsData.items.map((item, i) => ({
      ...item,
      title: t(`bfCard${i + 1}Title`),
      text: t(`bfCard${i + 1}Text`),
    })),
  }

  const csData = {
    ...collaborationChallengeSolutionData,
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
    <PageLayout ctaData={ctaData} pageKey="/features/collaboration" locale={locale}>
      <Hero
        pageName={nav('collaboration')}
        slug={nav('features')}
        slugLink={`/${locale}/features`}
        title={
          locale === 'de'
            ? t('heroTitle').split('\n').map((line, i) => ({ text: line, primary: false, newLine: i > 0 }))
            : [{ text: t('heroTitle'), primary: false }]
        }
        h1=""
        button={{ text: t('heroCta'), link: '/registration' }}
        description={t('heroDescription')}
        image={locale === 'de' ? '/images/german/collaboration-hero-g.svg' : '/images/hero/f_collaboration.svg'}
      />
      <FeaturesHowItWorks data={fhiwData} />
      <ChallengeSolution data={csData} />
      <BenifitsFeatures data={bfData} />
      <RealUseInDailyWorkSection {...rudwData} className="max-md:pb-0!" />
      <TestimonialSection pageKey="/features/collaboration" locale={locale}         heading={t('testimonialHeading')}
        subtext={t('testimonialSubtext')}
        data={{
          items: fCLtestimonials.items.map((item, i) => ({
            ...item,
            text: t(`testimonial${i + 1}Text`),
            role: t(`testimonial${i + 1}Role`),
            date: t(`testimonial${i + 1}Date`),
          })),
        }}
      />
      <FAQ pageKey="/features/collaboration" locale={locale}         heading={t('faqHeading')}
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
