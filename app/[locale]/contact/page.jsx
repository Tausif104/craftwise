import { getTranslations } from "next-intl/server";
import Hero from "@/components/global/Hero";
import PageLayout from "@/components/global/page-layout";
import GetHelp from "./_components/get-help";
import ContactUs from "./_components/contact-us";

export const metadata = {
  title: "Contact",
  description:
    "Craftwise is an all-in-one software solution designed to help craft businesses manage their projects, scheduling, quotes, invoices, and team communication in one central system. With Craftwise, you can streamline your operations and focus on growing your business.",
};

const Contact = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const nav = await getTranslations({ locale, namespace: "Nav" });
  const ctaData = {
    title: [{ text: t("footerCta.heading"), primary: false }],
    description: t("footerCta.body"),
    primaryBtn: { text: t("footerCta.primaryButton"), link: "/registration" },
    outlineBtn: { text: t("footerCta.secondaryButton"), link: "/book-demo" },
    maxWidth: "max-w-[850px]",
  };

  return (
    <PageLayout ctaData={ctaData} pageKey="/contact" locale={locale}>
      <Hero
        pageName={t("pageName")}
        title={[{ text: t("heroTitle"), primary: false }]}
        slug={nav("home")}
        slugLink="/"
        description={t("heroDescription")}
        descriptionTwo={t("heroDescriptionTwo")}
        image="/images/contact/contact-hero-thumbnail.png"
      />
      <GetHelp />
      <ContactUs />
    </PageLayout>
  );
};

export default Contact;
