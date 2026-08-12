import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/global/page-layout";
import { Link } from "@/i18n/navigation";
import { getLocalizedAlternates } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RegistrationConfirm" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getLocalizedAlternates({
      locale,
      href: "/registration/confirm",
    }),
  };
}

async function confirmToken(token) {
  if (!token) return { status: "missing" };
  try {
    const subscriber = await prisma.earlyAccessSubscriber.findUnique({
      where: { confirmationToken: token },
    });
    if (!subscriber) return { status: "invalid" };
    if (subscriber.confirmedAt) return { status: "already" };

    await prisma.earlyAccessSubscriber.update({
      where: { id: subscriber.id },
      data: { confirmedAt: new Date(), confirmationToken: null },
    });
    await sendWelcomeEmail({ to: subscriber.email, locale: subscriber.locale });
    return { status: "confirmed" };
  } catch (err) {
    console.error("registration confirm page error:", err);
    return { status: "error" };
  }
}

export default async function RegistrationConfirmPage({ params, searchParams }) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "RegistrationConfirm" });
  const result = await confirmToken(sp?.token);

  const isOk = result.status === "confirmed" || result.status === "already";

  return (
    <PageLayout pageKey="/registration/confirm" locale={locale}>
      <section className="relative pt-[140px] md:pt-[112px] xl:pt-[180px] pb-24 bg-[#F8FBFF]">
        <div className="container">
          <div className="max-w-[640px] mx-auto bg-white rounded-[24px] shadow-[0_20px_60px_rgba(1,46,51,0.08)] p-8 md:p-12 border border-[#E9EBF5] text-center">
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${
                isOk ? "bg-primary/10" : "bg-red-100"
              }`}
            >
              {isOk ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="#CC8640"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6l-12 12"
                    stroke="#DC2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
            <h1 className="text-[28px] md:text-[36px] font-bold text-text-secondary mb-4">
              {t(`${result.status}.title`)}
            </h1>
            <p className="text-[#393E41] text-base md:text-lg leading-relaxed mb-8">
              {t(`${result.status}.body`)}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 h-[52px] bg-primary hover:bg-[#d27e2a] text-white text-base font-bold rounded-full transition-colors"
            >
              {t("backHome")}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
