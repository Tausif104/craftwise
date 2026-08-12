import { getTranslations } from "next-intl/server";
import Hero from "@/components/global/Hero";
import PageLayout from "@/components/global/page-layout";
import News from "./_components/news";
import GoogleTranslate from "@/components/global/GoogleTranslate";
import { listPublishedPosts } from "@/app/actions/blog.actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "News",
  description:
    "Craftwise is an all-in-one software solution designed to help craft businesses manage their projects, scheduling, quotes, invoices, and team communication in one central system. With Craftwise, you can streamline your operations and focus on growing your business.",
};

const NewsPage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NewsPage" });
  const nav = await getTranslations({ locale, namespace: "Nav" });
  const response = await listPublishedPosts(locale);
  const posts = response.success ? response.posts : [];
  const ctaData = {
    title: [{ text: t("footerCta.heading"), primary: false }],
    description: t("footerCta.body"),
    primaryBtn: { text: t("footerCta.primaryButton"), link: "/registration" },
    outlineBtn: { text: t("footerCta.secondaryButton"), link: "/book-demo" },
    maxWidth: "max-w-[850px]",
  };

  return (
    <PageLayout ctaData={ctaData} pageKey="/news" locale={locale}>
      <GoogleTranslate />
      <Hero
        pageName={t("pageName")}
        title={[
          { text: t("heroTitle1"), primary: true },
          { text: t("heroTitle2"), primary: false },
        ]}
        slug={nav("home")}
        slugLink="/"
        description={t("heroDescription")}
        image={locale === "de" ? "/images/german/news-hero-g.svg" : "/images/news/news-new.svg"}
      />
      <News posts={posts} locale={locale} />
    </PageLayout>
  );
};

export default NewsPage;
