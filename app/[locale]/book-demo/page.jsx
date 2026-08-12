import { getTranslations } from 'next-intl/server'
import Hero from "@/components/global/Hero";
import PageLayout from "@/components/global/page-layout";
import WhyBook from "./_components/why-book";
import Booking from "./_components/booking";
import Workflow from "./_components/workflow";
import TestimonialSection from "@/components/shared/testimonials-section";

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('bookDemoTitle'),
    description: t('bookDemoDescription'),
  }
}

export default async function BookDemoPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'BookDemoPage' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })
  const ctaData = {
    title: [
      { text: t('footerCta.heading'), primary: false },
    ],
    description: t('footerCta.body'),
    primaryBtn: { text: t('footerCta.primaryButton'), link: "/registration" },
    maxWidth: "max-w-[850px]",
  }
  const testimonialData = {
    title: t('testimonialSection.heading'),
    items: [
      {
        id: 1,
        rating: 5,
        date: t('testimonialSection.items.1.date'),
        text: t('testimonialSection.items.1.text'),
        name: t('testimonialSection.items.1.name'),
        role: t('testimonialSection.items.1.role'),
        avatar: "/images/testimonials/book-demo/florian-e.png",
      },
      {
        id: 2,
        rating: 5,
        date: t('testimonialSection.items.2.date'),
        text: t('testimonialSection.items.2.text'),
        name: t('testimonialSection.items.2.name'),
        role: t('testimonialSection.items.2.role'),
        avatar: "/images/testimonials/book-demo/nadja-w.png",
      },
      {
        id: 3,
        rating: 5,
        date: t('testimonialSection.items.3.date'),
        text: t('testimonialSection.items.3.text'),
        name: t('testimonialSection.items.3.name'),
        role: t('testimonialSection.items.3.role'),
        avatar: "/images/testimonials/book-demo/christian-m.png",
      },
      {
        id: 4,
        rating: 5,
        date: t('testimonialSection.items.4.date'),
        text: t('testimonialSection.items.4.text'),
        name: t('testimonialSection.items.4.name'),
        role: t('testimonialSection.items.4.role'),
        avatar: "/images/testimonials/book-demo/isabell-r.png",
      },
      {
        id: 5,
        rating: 5,
        date: t('testimonialSection.items.5.date'),
        text: t('testimonialSection.items.5.text'),
        name: t('testimonialSection.items.5.name'),
        role: t('testimonialSection.items.5.role'),
        avatar: "/images/testimonials/book-demo/moritz-k.png",
      },
      {
        id: 6,
        rating: 5,
        date: t('testimonialSection.items.6.date'),
        text: t('testimonialSection.items.6.text'),
        name: t('testimonialSection.items.6.name'),
        role: t('testimonialSection.items.6.role'),
        avatar: "/images/testimonials/book-demo/aylin-s.png",
      },
    ],
  }

  return (
    <PageLayout ctaData={ctaData} pageKey="/book-demo" locale={locale}>
      <Hero
        slug={nav('home')}
        slugLink="/"
        pageName={t('pageName')}
        title={[
          { text: t('heroTitle1'), primary: false },
          { text: t('heroTitle2'), primary: true },
          { text: t('heroTitle3'), primary: false },
        ]}
        description={t('heroDescription')}
        image={locale === 'de' ? '/images/german/book-demo-hero-g.svg' : '/images/book-demo/hero.svg'}
      />
      <WhyBook
        heading={t('whyBookHeading')}
        cards={{
          card1Title: t('card1Title'),
          card1Text:  t('card1Text'),
          card2Title: t('card2Title'),
          card2Text:  t('card2Text'),
          card3Title: t('card3Title'),
          card3Text:  t('card3Text'),
          card4Title: t('card4Title'),
          card4Text:  t('card4Text'),
        }}
      />
      <Booking />
      <Workflow />
      <TestimonialSection pageKey="/book-demo" locale={locale} data={testimonialData} />
    </PageLayout>
  );
}
