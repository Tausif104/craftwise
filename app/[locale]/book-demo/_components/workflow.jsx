"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Workflow = () => {
    const t = useTranslations("BookDemoPage.workflowSection");
    const steps = [
        { number: "01", title: t("step1.title"), description: t("step1.text"), icon: "/images/book-demo/pick.svg" },
        { number: "02", title: t("step2.title"), description: t("step2.text"), icon: "/images/book-demo/live.svg" },
        { number: "03", title: t("step3.title"), description: t("step3.text"), icon: "/images/book-demo/anything.svg" },
        { number: "04", title: t("step4.title"), description: t("step4.text"), icon: "/images/book-demo/decide.svg" },
    ];

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveStep((current) => (current + 1) % steps.length);
        }, 2500);
        return () => window.clearInterval(interval);
    }, [steps.length]);

    return (
        <section className="bg-secondary py-20 md:py-24">
            <div className="container mx-auto px-4">
                <h3 className="text-center text-white">
                    {t("heading")}
                </h3>

                <div className="inner-gap"></div>

                {/* Desktop */}
                <div className="hidden md:block">
                    {/* circles row */}
                    <div className="relative mb-8">
                        <div className="absolute left-[12.5%] right-[12.5%] top-[40px] h-[4px] bg-primary/80" />
                        <div className="relative flex items-center justify-between">
                            {steps.map((step, i) => (
                                <div key={i} className="relative flex-1">
                                    <div
                                        onClick={() => setActiveStep(i)}
                                        className={`mx-auto flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-500 ${
                                            i === activeStep
                                                ? "scale-110 border-primary bg-primary shadow-[0_0_0_10px_rgba(255,255,255,0.12)]"
                                                : "border-white bg-white"
                                        }`}
                                    >
                                        <span className={`font-extrabold text-[24px] leading-none transition-colors duration-500 ${i === activeStep ? "text-white" : "text-primary"}`}>
                                            {step.number}
                                        </span>
                                    </div>
                                    {i !== steps.length - 1 ? (
                                        <div className="absolute top-[40px] right-[-12px] -translate-y-1/2">
                                            <ChevronRight className="text-primary mt-1" size={42} />
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* cards row */}
                    <div className="grid grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveStep(i)}
                                className={`cursor-pointer rounded-[24px] bg-white p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 ${
                                    i === activeStep ? "-translate-y-2 shadow-2xl" : "shadow-xl"
                                }`}
                            >
                                <div className={`w-25 h-25 rounded-full flex items-center justify-center mb-8 transition-colors duration-500 ${i === activeStep ? "bg-primary/20" : "bg-primary/10"}`}>
                                    <Image src={step.icon} alt={step.title} width={60} height={60} />
                                </div>
                                <h4 className="text-[20px] md:text-[22px] font-bold text-[#34495E] mb-4">
                                    {step.title}
                                </h4>
                                <p className="text-[#34495E]/70 text-[15px] md:text-[16px] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile */}
                <div className="md:hidden space-y-5">
                    {steps.map((step, i) => (
                        <div key={i} className="relative flex items-center gap-4">
                            <div className="relative flex w-[58px] flex-col items-center justify-center self-stretch">
                                <div
                                    className={`relative z-20 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 transition-all duration-500 ${
                                        i === activeStep
                                            ? "scale-110 border-primary bg-primary shadow-[0_0_0_8px_rgba(255,255,255,0.12)]"
                                            : "border-white bg-white"
                                    }`}
                                >
                                    <span className={`text-[18px] font-extrabold leading-none transition-colors duration-500 ${i === activeStep ? "text-white" : "text-primary"}`}>
                                        {step.number}
                                    </span>
                                </div>
                                {i !== steps.length - 1 ? (
                                    <div className="absolute left-1/2 top-1/2 h-[calc(100%+20px)] w-[2px] -translate-x-1/2 rounded-full bg-primary/80">
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <ChevronDown className="text-primary" size={30} />
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            <div
                                className={`flex-1 rounded-[16px] bg-white p-5 transition-all duration-500 ${i === activeStep ? "-translate-y-1" : ""}`}
                                style={{ boxShadow: "0px 0px 18px rgba(0,0,0,0.08)" }}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${i === activeStep ? "bg-primary/20" : "bg-primary/10"}`}>
                                        <Image src={step.icon} alt={step.title} width={32} height={32} />
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-bold leading-snug text-[#34495E]">
                                            {step.title}
                                        </h4>
                                        <p className="mt-2 text-[13px] leading-relaxed text-[#34495E]/70">
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

export default Workflow;
