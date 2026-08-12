import PageLayout from "@/components/global/page-layout";
import DownloadHero from "./_components/download-hero";
import AppFeatures from "./_components/app-features";
import DownloadFooter from "./_components/download-footer";

export const metadata = {
  title: "Mobile",
  description:
    "Download the CraftWise mobile app for iOS and Android. Manage projects, quotes, time tracking, and team chat on the go.",
};

const DownloadPage = async ({ params }) => {
  const { locale } = await params;
  const isDe = locale === "de";

  const ctaData = {
    title: isDe
      ? [
          { text: "Nimm CraftWise ", primary: false },
          { text: "überallhin", primary: true },
          { text: " mit.", primary: false },
        ]
      : [
          { text: "Take CraftWise ", primary: false },
          { text: "Everywhere", primary: true },
          { text: " You Work.", primary: false },
        ],
    description: isDe
      ? "Installiere die CraftWise App auf deinem Smartphone und steuere deine Baustelle direkt aus der Hosentasche."
      : "Install the CraftWise app on your phone and run your jobsite from your pocket.",
    primaryBtn: {
      text: isDe ? "14 Tage gratis testen" : "Start 14-Day Free Trial",
      link: "/registration",
    },
    outlineBtn: {
      text: isDe ? "Demo buchen" : "Book a Demo",
      link: "/book-demo",
    },
    maxWidth: "max-w-[850px]",
  };

  return (
    <PageLayout  pageKey="/mobile-app" locale={locale} ctaData={ctaData} ctaDesktopOnly>
      <DownloadHero />
      <AppFeatures locale={locale} />
      <DownloadFooter locale={locale} />
    </PageLayout>
  );
};

export default DownloadPage;
