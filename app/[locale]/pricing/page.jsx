import { getTranslations } from 'next-intl/server'
import PageLayout from "@/components/global/page-layout";
import Price from "./_components/price";
import FeatureComparison from "./_components/feature-comparison";
import WeOffer from "./_components/weoffer";
import FirstQuestion from "./_components/firstquestion";
import WhyChoose from "./_components/whychoose";
import Hero from "@/components/global/Hero";
import NextStep from "./_components/next-step";
import Faq from "./_components/faq";
import { ctaData } from "@/data/ctaData";
import { getFaqs } from "@/lib/content-source";
import { getPricingPlans } from "@/lib/content-source";

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('pricingTitle'),
    description: t('pricingDescription'),
  }
}

export default async function Pricing({ params }) {
  const { locale } = await params

  const cmsFaqs = await getFaqs("/pricing", locale);
  const t = await getTranslations({ locale, namespace: 'Pricing' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })
  const tCta = await getTranslations({ locale, namespace: 'CTAAbout' })

  // Managed in the CMS; falls back to data/pricing-data.js when unavailable.
  const plans = await getPricingPlans()

  const translatedCtaData = {
    ...ctaData,
    ...(locale === 'de'
      ? { maxWidth: 'max-w-[760px]', headingClass: 'lg:whitespace-nowrap' }
      : {}),
    title: [
      { text: tCta('headingPart1'), primary: false },
      { text: tCta('headingHighlight'), primary: true },
      { text: tCta('headingPart2'), primary: false },
    ],
    semiTitle: tCta('semiTitle'),
    description: tCta('body'),
    primaryBtn: { ...ctaData.primaryBtn, text: tCta('primaryCta') },
    outlineBtn: { ...ctaData.outlineBtn, text: tCta('secondaryCta') },
  }

  return (
    <PageLayout ctaData={translatedCtaData} pageKey="/pricing" locale={locale}>
      <Hero
        pageName={t('pageName')}
        slug={nav('home')}
        slugLink="/"
        title={[
          { text: t('heroTitle1'), primary: true },
          { text: t('heroTitle2'), primary: false },
        ]}
        description={t('heroDescription')}
        button={{ text: t('heroCta'), link: '/registration' }}
        image="/images/pricing/hero.svg"
      />
      <Price plans={plans} />
      <FeatureComparison />
       <WeOffer /> 
      <FirstQuestion />
      <WhyChoose />
      <NextStep />
      <Faq items={cmsFaqs} />
    </PageLayout>
  );
}
