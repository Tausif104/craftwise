import { getTranslations } from "next-intl/server";
import Hero from "@/components/global/Hero";
import PageLayout from "@/components/global/page-layout";
import CraftWise from "./_components/CraftWise";
import RealUseInDailyWorkSection from "@/components/shared/real-work";
import FormQuoteToPayment from "./_components/FormQuoteToPayment";
import BeforeAfter from "./_components/BeforeAfter";
import Craftspeople from "./_components/craftspeople";
import Cta from "./_components/cta";
import FAQ from "@/components/shared/faq";
import { ctaLandingData, ctaLandingDataDe } from "@/data/ctaData";
import TestimonialSection from "@/components/shared/testimonials-section";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "de" ? "Jetzt Loslegen" : "Get Started",
    description:
      "Craftwise is an all-in-one software solution designed to help craft businesses manage their projects, scheduling, quotes, invoices, and team communication in one central system. With Craftwise, you can streamline your operations and focus on growing your business.",
  };
}

const LandingPage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LandingPage" });
  const builtForEveryTrade = {
    title: t("builtForEveryTradeSection.heading"),
    subtitle: t("builtForEveryTradeSection.body"),
    illustration: {
      src: locale === 'de' ? "/images/german/trade-g.svg" : "/images/thumbs/built-for-every-trade-thumb.png",
      alt: t("builtForEveryTradeSection.heading"),
    },
    steps: [
      {
        title: t("builtForEveryTradeSection.item1.title"),
        description: t("builtForEveryTradeSection.item1.text"),
        icon: {
          src: "/images/features/electricians-icon.svg",
          alt: t("builtForEveryTradeSection.item1.title"),
        },
      },
      {
        title: t("builtForEveryTradeSection.item2.title"),
        description: t("builtForEveryTradeSection.item2.text"),
        icon: {
          src: "/images/features/roofers-icon.svg",
          alt: t("builtForEveryTradeSection.item2.title"),
        },
      },
      {
        title: t("builtForEveryTradeSection.item3.title"),
        description: t("builtForEveryTradeSection.item3.text"),
        icon: {
          src: "/images/features/painters-icon.svg",
          alt: t("builtForEveryTradeSection.item3.title"),
        },
      },
      {
        title: t("builtForEveryTradeSection.item4.title"),
        description: t("builtForEveryTradeSection.item4.text"),
        icon: {
          src: "/images/features/gardeners-icon.svg",
          alt: t("builtForEveryTradeSection.item4.title"),
        },
      },
    ],
  };
  const testimonialData = {
    title: t("testimonialSection.heading"),
    description: t("testimonialSection.subtext"),
    items: [
      {
        id: 1,
        rating: 5,
        date: t("testimonialSection.items.1.date"),
        text: t("testimonialSection.items.1.text"),
        name: t("testimonialSection.items.1.name"),
        role: t("testimonialSection.items.1.role"),
        avatar: "/images/testimonials/landing-page/oliver-t.png",
      },
      {
        id: 2,
        rating: 5,
        date: t("testimonialSection.items.2.date"),
        text: t("testimonialSection.items.2.text"),
        name: t("testimonialSection.items.2.name"),
        role: t("testimonialSection.items.2.role"),
        avatar: "/images/testimonials/landing-page/franziska-d.png",
      },
      {
        id: 3,
        rating: 5,
        date: t("testimonialSection.items.3.date"),
        text: t("testimonialSection.items.3.text"),
        name: t("testimonialSection.items.3.name"),
        role: t("testimonialSection.items.3.role"),
        avatar: "/images/testimonials/landing-page/yasin-k.png",
      },
      {
        id: 4,
        rating: 5,
        date: t("testimonialSection.items.4.date"),
        text: t("testimonialSection.items.4.text"),
        name: t("testimonialSection.items.4.name"),
        role: t("testimonialSection.items.4.role"),
        avatar: "/images/testimonials/landing-page/theresa-l.png",
      },
      {
        id: 5,
        rating: 5,
        date: t("testimonialSection.items.5.date"),
        text: t("testimonialSection.items.5.text"),
        name: t("testimonialSection.items.5.name"),
        role: t("testimonialSection.items.5.role"),
        avatar: "/images/testimonials/landing-page/bjarne-m.png",
      },
      {
        id: 6,
        rating: 5,
        date: t("testimonialSection.items.6.date"),
        text: t("testimonialSection.items.6.text"),
        name: t("testimonialSection.items.6.name"),
        role: t("testimonialSection.items.6.role"),
        avatar: "/images/testimonials/landing-page/elif-s.png",
      },
    ],
  };
  const landingFaqItems = [
    {
      question: t("faqSection.faq1.question"),
      answer: t("faqSection.faq1.answer"),
    },
    {
      question: t("faqSection.faq2.question"),
      answer: t("faqSection.faq2.answer"),
    },
    {
      question: t("faqSection.faq3.question"),
      answer: t("faqSection.faq3.answer"),
    },
    {
      question: t("faqSection.faq4.question"),
      answer: t("faqSection.faq4.answer"),
    },
    {
      question: t("faqSection.faq5.question"),
      answer: t("faqSection.faq5.answer"),
    },
  ];

  return (
    <PageLayout ctaData={locale === 'de' ? ctaLandingDataDe : ctaLandingData} pageKey="/landing-page" locale={locale}>
      <Hero
        pageName={t("pageName")}
        h1={locale === 'de' ? '!leading-[1.33]' : ''}
        title={[
          { text: t("heroTitle1"), primary: false },
          { text: t("heroTitle2"), primary: false, newLine: locale === 'de' },
          { text: t("heroTitle3"), primary: false, newLine: locale === 'de' },
        ]}
        description={t("heroDescription")}
        button={{ text: t("heroCta"), link: "/registration" }}
        image={locale === 'de' ? '/images/landing/landing-page-thumb.svg' : '/images/landing/landing-page-thumb.png'}
      />
      <CraftWise />
      <RealUseInDailyWorkSection {...builtForEveryTrade} btn={{ text: t("builtForEveryTradeSection.cta"), link: "/features" }} />
      <FormQuoteToPayment />
      <BeforeAfter />
      {/* <Craftspeople /> */}
      <TestimonialSection pageKey="/landing-page" locale={locale} data={testimonialData} />
      <Cta />
      <div className="-mt-10">
        <FAQ pageKey="/landing-page" locale={locale} faqItems={landingFaqItems} topPadding heading={t("faqSection.heading")} />
      </div>
    </PageLayout>
  );
};

export default LandingPage;
