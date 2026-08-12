"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import RegistrationForm from "./registration-form";

export default function RegistrationHero({ locale }) {
  const t = useTranslations("Registration");

  const checkItems = [
    t("hero.check1"),
    t("hero.check2"),
    t("hero.check3"),
    t("hero.check4"),
  ];

  return (
    <section className="relative w-full pt-[120px] sm:pt-[150px] md:pt-[112px] xl:pt-[180px] pb-[60px] md:pb-[80px] xl:pb-[106px] overflow-hidden">
      {/* Background — desktop / mobile */}
      <div
        className="absolute hidden lg:block inset-0 bg-no-repeat bg-bottom bg-cover"
        style={{ backgroundImage: "url('/images/bg/hero-bg.jpg')" }}
      />
      <div
        className="absolute lg:hidden inset-0 bg-no-repeat bg-bottom bg-cover"
        style={{ backgroundImage: "url('/images/bg/mobile-bg.png')" }}
      />

      <div className="container relative z-10 px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* LEFT — content */}
          <div className="text-center lg:text-start lg:max-w-[552px]">
            <p className="text-primary font-medium text-sm lg:text-lg tracking-wide">
              {t("hero.tagline")}
            </p>

            <h1 className="text-[30px] md:text-[46px] lg:text-[56px] font-extrabold leading-[1.15] mt-4 md:mt-6 text-text-secondary">
              {t.rich("hero.heading", {
                brand: (chunks) => <span className="text-text-secondary">{chunks}</span>,
                soon: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h1>

            <p className="text-base lg:text-lg text-[#393E41] mt-4 lg:mt-5 leading-relaxed">
              {t("hero.description1")}
            </p>

            <p className="text-base lg:text-lg text-[#393E41] mt-4 leading-relaxed">
              {t("hero.description2")}
            </p>

            {/* Checklist */}
            <ul className="mt-6 lg:mt-8 space-y-3 flex flex-col items-center lg:items-start">
              {checkItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Image
                    src="/images/registration/check-icon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                  <span className="text-base text-[#393E41] leading-[34px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — form card */}
          <div className="flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="w-full max-w-[540px] lg:max-w-none bg-white rounded-2xl border border-black/10 p-6 md:p-10 shadow-[0_20px_60px_rgba(1,46,51,0.08)]">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <Image
                  src="/images/registration/calendar-icon.svg"
                  alt=""
                  width={40}
                  height={40}
                />
                <span className="text-xl font-semibold text-[#0A1B28] tracking-wide">
                  {t("hero.formTitle")}
                </span>
              </div>

              <RegistrationForm
                locale={locale}
                labels={{
                  emailPlaceholder: t("fields.email.placeholder"),
                  consentTerms: t("consents.terms"),
                  consentPrivacy: t("consents.privacy"),
                  consentMarketing: t("consents.marketing"),
                  submit: t("submit"),
                  submitting: t("submitting"),
                  successTitle: t("success.title"),
                  successBody: t("success.body"),
                  errorInvalidEmail: t("errors.invalidEmail"),
                  errorConsents: t("errors.consents"),
                  errorServer: t("errors.server"),
                  termsLinkText: t("links.terms"),
                  privacyLinkText: t("links.privacy"),
                  legalNote: t("legalNote"),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
