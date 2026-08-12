import { getTranslations } from 'next-intl/server'
import Hero from "@/components/global/Hero";
import PageLayout from "@/components/global/page-layout";
import Service from "./_components/service";
import HowItWorks from "./_components/how-it-works";
import WhatGain from "./_components/what-gain";
import BookNow from "./_components/book-now";
import Faq from "./_components/faq";
import { ctaData } from "@/data/ctaData";
import { getFaqs } from "@/lib/content-source";

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('consultingTitle'),
    description: t('consultingDescription'),
  }
}

export default async function Consulting({ params }) {
  const { locale } = await params

  const cmsFaqs = await getFaqs("/consulting", locale);
  const t = await getTranslations({ locale, namespace: 'Consulting' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })
  const tCta = await getTranslations({ locale, namespace: 'CTAAbout' })

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
    <PageLayout ctaData={translatedCtaData} pageKey="/consulting" locale={locale}>
      <Hero
        pageName={t('pageName')}
        slug={nav('home')}
        slugLink="/"
        title={[
          { text: t('heroTitle1'), primary: false },
          { text: t('heroTitle2'), primary: true },
        ]}
        description={t('heroDescription')}
        button={{ text: t('heroCta'), link: '#book-now' }}
        image="/images/consulting/hero.svg"
      />
      <Service />
      <HowItWorks />
      <WhatGain />
      <BookNow />
      <Faq items={cmsFaqs} />
    </PageLayout>
  );
}
