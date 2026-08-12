import { getTranslations } from 'next-intl/server'
import Hero from '@/components/global/Hero'
import AboutUsPage from '@/components/AboutusPage/AboutUsPage'
import PageLayout from '@/components/global/page-layout'
import { ctaData } from '@/data/ctaData'
import { getLocalizedAlternates } from '@/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: getLocalizedAlternates({ locale, href: '/about-us' }),
  }
}

export default async function About({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AboutUs' })
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
    <PageLayout ctaData={translatedCtaData} pageKey="/about-us" locale={locale}>
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
        button={{ text: t('heroCta'), link: '/registration' }}
        image="/images/hero/about.png"
      />
      <AboutUsPage />
    </PageLayout>
  )
}
