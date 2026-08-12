import { getTranslations } from 'next-intl/server'
import DailyTradeWork from '@/components/daily-trade-work'
import Hero from '@/components/global/Hero'
import PageLayout from '@/components/global/page-layout'
import IndustrySpecificSoftware from '@/components/industry-specific-software'
import FAQ from '@/components/shared/faq'
import TestimonialSection from "@/components/shared/testimonials-section";
import TradesWeSupport from '@/components/traders-we-support'
import { testimonialsIndustry } from '@/data/testimonials'
import { getLocalizedAlternates } from '@/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('industryTitle'),
    description: t('industryDescription'),
    alternates: getLocalizedAlternates({ locale, href: '/industry' }),
  }
}

export default async function IndustryPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Industry' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })

  const richHeading = (key) =>
    t.rich(key, { o: (chunks) => <span className="text-primary">{chunks}</span> })

  const ctaData = {
    ...(locale === 'de'
      ? { maxWidth: 'max-w-[760px]', headingClass: 'lg:whitespace-nowrap' }
      : {}),
    title: [
      { text: t('ctaTitlePart1'), primary: false },
      { text: t('ctaTitleHighlight'), primary: true },
      ...(t('ctaTitlePart2') ? [{ text: t('ctaTitlePart2'), primary: false }] : []),
    ],
    semiTitle: t('ctaSemiTitle'),
    description: t('ctaDescription'),
    primaryBtn: { text: t('ctaPrimaryBtn'), link: '/registration' },
    outlineBtn: { text: t('ctaOutlineBtn'), link: `/${locale}/book-demo` },
  }

  return (
    <PageLayout ctaData={ctaData} pageKey="/industry" locale={locale}>
      <Hero
        pageName={t('pageName')}
        slug={nav('home')}
        slugLink={`/${locale}`}
        title={[
          { text: t('heroTitle1'), primary: false },
          { text: t('heroTitle2'), primary: true },
        ]}
        button={{ text: t('heroCta'), link: '/registration' }}
        description={t('heroDescription')}
        image="/images/hero/f_industry.svg"
      />
      <IndustrySpecificSoftware
        heading={richHeading('issHeading')}
        headingClass={locale === 'de' ? 'lg:whitespace-pre' : ''}
        subtext={t('issSubtext')}
        items={[
          { title: t('iss1Title'), content: t('iss1Content') },
          { title: t('iss2Title'), content: t('iss2Content') },
          { title: t('iss3Title'), content: t('iss3Content') },
          { title: t('iss4Title'), content: t('iss4Content') },
          { title: t('iss5Title'), content: t('iss5Content') },
        ]}
      />
      <TradesWeSupport
        heading={t('twsHeading')}
        subtext={t('twsSubtext')}
        learnMore={t('twsLearnMore')}
        trades={[
          { icon: '/images/icons/electrician-icon.svg', svg: '/images/svg/electricians.svg', title: t('tws1Title'), description: t('tws1Text'), link: `/${locale}/industry/electricians` },
          { icon: '/images/icons/plumber-icon.svg',     svg: '/images/svg/plumbers.svg',     title: t('tws2Title'), description: t('tws2Text'), link: `/${locale}/industry/plumbers` },
          { icon: '/images/icons/painter-icon.svg',     svg: '/images/svg/painters.svg',     title: t('tws3Title'), description: t('tws3Text'), link: `/${locale}/industry/painters` },
          { icon: '/images/icons/roofer-icon.svg',      svg: '/images/svg/roofers.svg',      title: t('tws4Title'), description: t('tws4Text'), link: `/${locale}/industry/roofers` },
          { icon: '/images/icons/gardener-icon.svg',    svg: '/images/svg/gardener.svg',     title: t('tws5Title'), description: t('tws5Text'), link: `/${locale}/industry/gardeners` },
          { icon: '/images/icons/carpenter-icon.svg',   svg: '/images/svg/carpenters.svg',   title: t('tws6Title'), description: t('tws6Text'), link: `/${locale}/industry/carpenters` },
        ]}
      />
      <DailyTradeWork
        heading={t('dtwHeading')}
        items={[
          { title: t('dtw1Title'), content: t('dtw1Content') },
          { title: t('dtw2Title'), content: t('dtw2Content') },
          { title: t('dtw3Title'), content: t('dtw3Content') },
          { title: t('dtw4Title'), content: t('dtw4Content') },
          { title: t('dtw5Title'), content: t('dtw5Content') },
          { title: t('dtw6Title'), content: t('dtw6Content') },
        ]}
      />
      <TestimonialSection pageKey="/industry" locale={locale}         heading={t('testimonialHeading')}
        subtext={t('testimonialSubtext')}
        data={{
          items: testimonialsIndustry.items.map((item, i) => ({
            ...item,
            text: t(`testimonial${i + 1}Text`),
            role: t(`testimonial${i + 1}Role`),
            date: t(`testimonial${i + 1}Date`),
          })),
        }}
      />
      <FAQ pageKey="/industry" locale={locale}         heading={t('faqHeading')}
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
