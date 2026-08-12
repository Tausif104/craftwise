"use client";

import { useTranslations, useLocale } from "next-intl";
import CTASection from "@/components/shared/cta-section";

const CTAAboutSection = () => {
    const t = useTranslations("CTAAbout");
    const locale = useLocale();

    const ctaData = {
        ...(locale === "de"
            ? { maxWidth: "max-w-[760px]", headingClass: "lg:whitespace-nowrap" }
            : {}),
        title: [
            { text: t("headingPart1"), primary: false },
            { text: t("headingHighlight"), primary: true },
            { text: t("headingPart2"), primary: false },
        ],
        semiTitle: t("semiTitle"),
        description: t("body"),
        primaryBtn: { text: t("primaryCta"), link: "/registration" },
        outlineBtn: { text: t("secondaryCta"), link: "/book-demo" },
    };

    return <CTASection ctaData={ctaData} />;
};

export default CTAAboutSection;
