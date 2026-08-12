"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const FormQuoteToPayment = () => {
    const t = useTranslations("LandingPage.quoteToPaymentSection");
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        {
            number: "01",
            title: t("step1.title"),
            description: t("step1.text"),
            icon: "/images/landing/flow-icon1.svg"
        },
        {
            number: "02",
            title: t("step2.title"),
            description: t("step2.text"),
            icon: "/images/landing/flow-icon2.svg"
        },
        {
            number: "03",
            title: t("step3.title"),
            description: t("step3.text"),
            icon: "/images/landing/flow-icon3.svg"
        }
    ];

    useEffect(() => {
        if (steps.length <= 1) return undefined;

        const interval = window.setInterval(() => {
            setActiveStep((current) => (current + 1) % steps.length);
        }, 2500);

        return () => window.clearInterval(interval);
    }, [steps.length]);

    return (
        <section className="sec-padding-top pb-10 md:pb-15">
            <div className="container mx-auto px-4">
                <h3 className="text-center">
                    {t("heading")}
                </h3>
                <p className="max-w-2xl text-center mx-auto">{t("subtext")}</p>
                <div className="inner-gap"></div>

                <div className="hidden lg:grid lg:grid-cols-3 gap-8 relative ">

                    <div className="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-[4px] z-0">
                        <div className="flex justify-between items-center w-full h-full">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex-1 h-[4px] bg-[#C88640] relative">
                                    <div className="absolute  left-0 right-0 top-1/2 -translate-y-1/2 translate-x-1/2 ">
                                     <ChevronRight className="text-primary  text-[36px]" size={42} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center relative z-10">
                            <div
                                className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-[20px] md:text-[32px] font-extrabold mb-8 shrink-0 aspect-square border-2 transition-all duration-500 ${
                                    index === activeStep
                                        ? "scale-110 border-primary bg-primary text-white shadow-[0_0_0_10px_rgba(200,134,64,0.18)]"
                                        : "border-primary bg-white text-primary shadow-xl"
                                }`}
                            >
                                {step.number}
                            </div>

                            <div
                                className={`rounded-[24px] p-8 md:p-10 flex flex-col items-center text-center w-full h-full min-h-[320px] transition-all duration-500 ${
                                    index === activeStep
                                        ? "-translate-y-2 bg-white shadow-2xl"
                                        : "bg-white shadow-[0px_8px_30px_rgba(10,27,40,0.10)]"
                                }`}
                            >
                                <div className="w-[100px] h-[100px] rounded-full bg-[#C88640]/10 flex items-center justify-center text-[#C88640] mb-8">
                                    <Image src={step.icon} alt={step.title} width={55} height={55} />
                                </div>
                                <h4 className="text-[20px] md:text-[24px] font-bold text-[#0A1B28] mb-4">
                                    {step.title}
                                </h4>
                                <p className="text-[#393E41] text-[15px] md:text-[16px] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:hidden space-y-5">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative flex items-center gap-4">
                            <div className="relative flex w-[58px] flex-col items-center justify-center self-stretch">
                                <div
                                    className={`relative z-20 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 transition-all duration-500 ${
                                        index === activeStep
                                            ? "scale-110 border-primary bg-primary shadow-[0_0_0_8px_rgba(200,134,64,0.18)]"
                                            : "border-primary bg-white"
                                    }`}
                                >
                                    <span
                                        className={`font-extrabold transition-colors duration-500 ${
                                            index === activeStep ? "text-white" : "text-primary"
                                        }`}
                                    >
                                        {step.number}
                                    </span>
                                </div>

                                {index !== steps.length - 1 ? (
                                    <div className="absolute left-1/2 top-1/2 h-[calc(100%+20px)] w-[2px] -translate-x-1/2 rounded-full bg-primary/80">
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <ChevronDown className="text-primary" size={32} />
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            <div
                                className={`flex-1 rounded-[16px] p-5 transition-all duration-500 ${
                                    index === activeStep
                                        ? "-translate-y-1 bg-white shadow-xl"
                                        : "bg-white shadow-[0px_0px_18px_rgba(0,0,0,0.08)]"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-full bg-[#C88640]/10">
                                        <Image src={step.icon} alt={step.title} width={28} height={28} />
                                    </div>

                                    <div>
                                        <h4 className="text-[16px] font-bold leading-snug text-[#0A1B28]">
                                            {step.title}
                                        </h4>
                                        <p className="mt-2 text-[13px] leading-relaxed text-[#5E666B]">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FormQuoteToPayment;
