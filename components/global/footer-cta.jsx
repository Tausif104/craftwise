"use client";

import React from "react";
import { useTranslations } from "next-intl";

const FooterCTA = () => {
  const t = useTranslations("CTAAbout");

  return (
    <section className="bg-gradient-to-r from-[#304C61] to-[#14232F] text-white py-16 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-4">
          {t("headingPart1")}<span className="text-primary">{t("headingHighlight")}</span>{t("headingPart2")}
          {" "}{t("semiTitle")}
        </h2>
        <p className="text-lg font-light mb-8">
          {t("body")}
        </p>
        <div className="flex justify-center gap-6">
          <a href="/registration" className="bg-[#304C61] text-white py-3 px-8 rounded-md hover:bg-[#14232F] border border-white">
            {t("primaryCta")}
          </a>
          <a href="/book-demo" className="border-2 border-white py-3 px-8 rounded-md text-white hover:bg-white hover:text-[#304C61]">
            {t("secondaryCta")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
