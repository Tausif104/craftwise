"use client";

import { useTranslations } from "next-intl";
import CommonCard from "@/components/global/CommonCard";

const HowItWorks = () => {
    const t = useTranslations("ConsultingHowItWorks");

    const steps = [
        { icon: "01", title: t("step1Title"), description: t("step1Text") },
        { icon: "02", title: t("step2Title"), description: t("step2Text") },
        { icon: "03", title: t("step3Title"), description: t("step3Text") },
        { icon: "04", title: t("step4Title"), description: t("step4Text") },
    ];

    return (
        <div className="sec-padding-top">
            <div className="container">
                <h2 className="text-center">{t("heading")}</h2>
                <div className="inner-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7 pb-8">
                    {steps.map((item, index) => (
                        <CommonCard
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
