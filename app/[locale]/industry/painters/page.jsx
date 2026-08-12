import { getTranslations } from 'next-intl/server'
import Hero from '@/components/global/Hero'
import PageLayout from '@/components/global/page-layout'
import FAQ from '@/components/shared/faq'
import CarftwiseSolves from '@/components/shared/industry/carftwise-solves'
import CommonChallanges from '@/components/shared/industry/common-challanges'
import KeyBenefits from '@/components/shared/industry/key-benifits'
import WorkflowSteps from '@/components/shared/industry/workflow-steps'
import TestimonialSection from "@/components/shared/testimonials-section";
import { paintnerCommonChallengesData } from '@/data/commonChallangesData'
import { paintersSolvesData } from '@/data/industrySolveData'
import { paintersKeyBenefitsData } from '@/data/keyBenifitsData'
import { painterstestimonials } from '@/data/testimonials'
import { paintersWorkflowData } from '@/data/workFlowStepsData'
import { getLocalizedAlternates } from '@/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('paintersTitle'),
    alternates: getLocalizedAlternates({ locale, href: '/industry/painters' }),
  }
}

const page = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Painters' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })

  const ccData = {
    ...paintnerCommonChallengesData,
    title: {
      normal: t('ccTitleNormal'),
      connector: t('ccTitleConnector'),
      highlight: t('ccTitleHighlight'),
      end: t('ccTitleEnd'),
    },
    items: [t('ccItem1'), t('ccItem2'), t('ccItem3'), t('ccItem4')],
  }

  const csData = {
    ...paintersSolvesData,
    headingParts: [
      { text: t('csPart1'), className: 'text-secondary' },
      { text: t('csPart2'), className: 'text-primary' },
      { text: t('csPart3'), className: 'text-secondary' },
    ],
    items: paintersSolvesData.items.map((item, i) => ({
      ...item,
      title: t(`csCard${i + 1}Title`),
      text: t(`csCard${i + 1}Text`),
    })),
  }

  const wsData = {
    ...paintersWorkflowData,
    heading: t('wsHeading'),
    steps: paintersWorkflowData.steps.map((step, i) => ({
      ...step,
      title: t(`wsStep${i + 1}Title`),
      text: t(`wsStep${i + 1}Text`),
    })),
  }

  const ctaData = {
    title: [{ text: t('ctaTitle'), primary: false }],
    description: t('ctaDescription'),
    primaryBtn: { text: t('ctaPrimaryBtn'), link: '/registration' },
    outlineBtn: { text: t('ctaOutlineBtn'), link: `/${locale}/book-demo` },
    maxWidth: 'max-w-[850px]',
  }

  const kbData = {
    ...paintersKeyBenefitsData,
    headingParts: [
      { text: t('kbPart1'), className: 'text-secondary' },
      { text: t('kbPart2'), className: 'text-primary' },
    ],
    items: paintersKeyBenefitsData.items.map((item, i) => ({
      ...item,
      title: t(`kbCard${i + 1}Title`),
      text: t(`kbCard${i + 1}Text`),
    })),
  }

  return (
    <PageLayout ctaData={ctaData} pageKey="/industry/painters" locale={locale}>
      <Hero
        pageName={nav('painters')}
        slug={nav('industry')}
        slugLink={`/${locale}/industry`}
        title={[{ text: t('heroTitle'), primary: false }]}
        button={{ text: t('heroCta'), link: '/registration' }}
        description={t('heroDescription')}
        image={locale === 'de' ? '/images/german/painters-g-hero.svg' : '/images/hero/i_paintner.svg'}
      />
      <CommonChallanges data={ccData} />
      <CarftwiseSolves data={csData} />
      <WorkflowSteps data={wsData} />
      <KeyBenefits data={kbData} />
      <TestimonialSection pageKey="/industry/painters" locale={locale}         heading={t('testimonialHeading')}
        subtext={t('testimonialSubtext')}
        data={{
          items: painterstestimonials.items.map((item, i) => ({
            ...item,
            text: t(`testimonial${i + 1}Text`),
            role: t(`testimonial${i + 1}Role`),
            date: t(`testimonial${i + 1}Date`),
          })),
        }}
      />
      <FAQ pageKey="/industry/painters" locale={locale}         heading={t('faqHeading')}
        faqItems={[
          { question: t('faq1Question'), answer: t('faq1Answer') },
          { question: t('faq2Question'), answer: t('faq2Answer') },
          { question: t('faq3Question'), answer: t('faq3Answer') },
          { question: t('faq4Question'), answer: t('faq4Answer') },
          { question: t('faq5Question'), answer: t('faq5Answer') },
        ]}
      />
    </PageLayout>
  )
}

export default page
