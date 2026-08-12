import { getTranslations } from 'next-intl/server'
import Hero from '@/components/global/Hero'
import PageLayout from '@/components/global/page-layout'
import ExploreFeatures from './_components/explore-features'
import HowItWorksSection from './_components/how-it-works'
import FeaturedCheckListSection from './_components/featured-checklist'
import OnePlatformSection from './_components/one-platform'
import SeeForYourself from './_components/see-for-yourself'
import FAQ from '@/components/shared/faq'
import { ctaData } from '@/data/ctaData'
import { getLocalizedAlternates } from '@/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('featuresTitle'),
    description: t('featuresDescription'),
    alternates: getLocalizedAlternates({ locale, href: '/features' }),
  }
}

export default async function FeaturesPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Features' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })
  const tf = await getTranslations({ locale, namespace: 'FeaturesFaq' })
  const tCta = await getTranslations({ locale, namespace: 'CTAFeatures' })

  const richT = (key) =>
    t.rich(key, { strong: (chunks) => <strong className="font-bold">{chunks}</strong> })

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
    <PageLayout ctaData={translatedCtaData} pageKey="/features" locale={locale}>
      <Hero
        pageName={t('pageName')}
        slug={nav('home')}
        slugLink='/'
        title={[
          { text: t('heroTitle1'), primary: false },
          { text: t('heroTitle2'), primary: true },
          { text: t('heroTitle3'), primary: false },
        ]}
        button={{ text: t('heroCta'), link: '/registration' }}
        description={t('heroDescription')}
        image={locale === 'de' ? '/images/german/feature-bg-g.svg' : '/images/features/feature-bg.svg'}
        h1='max-[575px]:max-w-[320px] mx-auto'
      />
      <ExploreFeatures
        heading1={t('exploreHeading1')}
        heading2={t('exploreHeading2')}
        learnMore={t('learnMore')}
        features={[
          { image: locale === 'de' ? '/images/german/feature-card-f-g-1.png' : '/images/featured-cards/1.png', title: t('card1Title'), description: t('card1Text'), href: '/features/quoting-invoicing' },
          { image: '/images/featured-cards/2.png', title: t('card2Title'), description: t('card2Text'), href: '/features/collaboration' },
          { image: '/images/featured-cards/3.png', title: t('card3Title'), description: t('card3Text'), href: '/features/planning-scheduling' },
          { image: '/images/featured-cards/4.png', title: t('card4Title'), description: t('card4Text'), href: '/features/time-tracking' },
          { image: '/images/featured-cards/5.png', title: t('card5Title'), description: t('card5Text'), href: '/features/project-file' },
          { image: '/images/featured-cards/6.png', title: t('card6Title'), description: t('card6Text'), href: '/features/workflows-automation' },
        ]}
      />
      <HowItWorksSection
        heading1={t('howItWorksHeading1')}
        headingHighlight={t('howItWorksHeadingHighlight')}
        heading2={t('howItWorksHeading2')}
        subtext={t('howItWorksSubtext')}
        steps={[t('howItWorksStep1'), t('howItWorksStep2'), t('howItWorksStep3'), t('howItWorksStep4')]}
        bottomText={t('howItWorksBottom')}
      />
      <FeaturedCheckListSection
        heading1={t('whyTeamsHeading1')}
        headingHighlight={t('whyTeamsHeadingHighlight')}
        heading2={t('whyTeamsHeading2')}
        items={[
          t('whyTeamsItem1'),
          t('whyTeamsItem2'),
          t('whyTeamsItem3'),
          t('whyTeamsItem4'),
          t('whyTeamsItem5'),
          t('whyTeamsItem6'),
        ]}
        ctaText={t('whyTeamsCta')}
      />
      <OnePlatformSection
        heading1={t('onePlatformHeading1')}
        headingHighlight={t('onePlatformHeadingHighlight')}
        subtext={t('onePlatformSubtext')}
        officeTitle={richT('onePlatformOfficeTitle')}
        officeBullets={[richT('onePlatformOffice1'), richT('onePlatformOffice2'), richT('onePlatformOffice3'), richT('onePlatformOffice4')]}
        siteTitle={richT('onePlatformSiteTitle')}
        siteBullets={[richT('onePlatformSite1'), richT('onePlatformSite2'), richT('onePlatformSite3'), richT('onePlatformSite4')]}
      />
      <SeeForYourself
        image={locale === 'de' ? '/images/german/see-it-german.webp' : '/images/thumbs/see-for-yourself.webp'}
        heading={t('seeForYourselfHeading')}
        body1={t('seeForYourselfBody1')}
        body2={t('seeForYourselfBody2')}
        primaryCta={t('seeForYourselfPrimaryCta')}
        secondaryCta={t('seeForYourselfSecondaryCta')}
      />
      <FAQ pageKey="/features" locale={locale}         heading={tf('heading')}
        faqItems={[
          { question: tf('q1'), answer: tf('a1') },
          { question: tf('q2'), answer: tf('a2') },
          { question: tf('q3'), answer: tf('a3') },
          { question: tf('q4'), answer: tf('a4') },
          { question: tf('q5'), answer: tf('a5') },
          { question: tf('q6'), answer: tf('a6') },
          { question: tf('q7'), answer: tf('a7') },
        ]}
        topPadding
      />
    </PageLayout>
  )
}
