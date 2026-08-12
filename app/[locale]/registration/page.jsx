import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/global/page-layout";
import { getLocalizedAlternates } from "@/lib/seo";
import RegistrationHero from "./_components/registration-hero";
import WhySignUp from "./_components/why-sign-up";
import { ctaLandingData } from "@/data/ctaData";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Registration" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getLocalizedAlternates({ locale, href: "/registration" }),
  };
}

export default async function RegistrationPage({ params }) {
  const { locale } = await params;

  return (
    <PageLayout pageKey="/registration" locale={locale} >
      <RegistrationHero locale={locale} />
      <WhySignUp locale={locale} />
    </PageLayout>
  );
}
