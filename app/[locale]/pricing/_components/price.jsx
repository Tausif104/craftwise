"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { pricingPlans as staticPricingPlans, pricingLabels } from "@/data/pricing-data";
import { formatPrice } from "@/lib/pricing-utils";

const Price = ({ plans: cmsPlans }) => {
    const [isAnnual, setIsAnnual] = useState(false);
    const locale = useLocale();
    const language = locale === "de" ? "de" : "en";

    // CMS-managed when available, otherwise the static file that shipped with
    // the repo — so pricing never renders empty if the database is unreachable.
    const pricingPlans = cmsPlans?.length ? cmsPlans : staticPricingPlans;

    const t = pricingLabels[language] || pricingLabels.en;
    const defaultMobilePlan = pricingPlans.find((plan) => plan.popular)?.id || pricingPlans[0]?.id;

    const renderPlanFeatures = (plan) => (
        <ul className="space-y-5">
            {plan.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 w-[18px] h-[18px] rounded-full bg-[#CC8640] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white stroke-[4]" />
                    </div>
                    <span className={cn("text-[16px] leading-snug font-medium", plan.popular ? "text-white" : "text-[#212D3C]")}>
                        {feature[language] || feature.en}
                    </span>
                </li>
            ))}
        </ul>
    );

    const renderPlanButton = (plan) => (
        <Button
            className={cn(
                "w-full rounded-full py-5 md:py-6 cursor-pointer text-base font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-sm",
                plan.popular
                    ? "bg-white text-[#304C61] hover:bg-gray-100 hover:scale-[1.02]"
                    : "bg-white text-[#304C61] border-2 border-[#304C61] hover:bg-[#304C61] hover:text-white hover:scale-[1.02]"
            )}
        >
            {plan.buttonText[language] || plan.buttonText.en} <ArrowRight className="w-5 h-5" />
        </Button>
    );

    return (
        <section className="sec-padding-top ">
            <div className="container">

                <div className="text-center max-w-[795px] mx-auto">
                    <h2 className="text-[#0A1B28]">{t.title}</h2>
                    <p className="pt-4 text-[#393E41]">{t.subtitle}</p>
                    <p className="text-[#393E41]">{t.vatInfo}</p>
                </div>

                <div className="inner-gap flex flex-col items-center notranslate">

                    <div className="relative flex items-center bg-white border border-[#E5E7EB] rounded-full p-1 mb-16 h-[52px] w-fit">

                        <div
                            className={cn(
                                "absolute h-[calc(100%-8px)] w-[calc(50%-4px)] bg-[#304C61] rounded-full transition-all duration-500 ease-in-out",
                                isAnnual ? "translate-x-[100%]" : "translate-x-0"
                            )}
                        />
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={cn(
                                "relative z-10 px-0 py-3 cursor-pointer text-sm md:text-lg font-semibold transition-all duration-300 rounded-full w-[140px] flex items-center justify-center",
                                !isAnnual ? "text-white" : "text-[#393E41] hover:text-[#304C61]"
                            )}
                        >
                            {t.monthly}
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={cn(
                                "relative z-10 px-0 py-3 cursor-pointer text-sm md:text-lg font-semibold transition-all duration-300 rounded-full flex items-center justify-center gap-2 w-[140px]",
                                isAnnual ? "text-white" : "text-[#393E41] hover:text-[#304C61]"
                            )}
                        >
                            {t.annually}
                            <span className="absolute -top-4 -right-6 bg-[#CC8640] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg transform rotate-14 whitespace-nowrap">
                                {t.save20}
                            </span>
                        </button>
                    </div>


                    <Accordion
                        type="single"
                        collapsible
                        defaultValue={defaultMobilePlan}
                        className="w-full space-y-4 md:hidden"
                    >
                        {pricingPlans.map((plan, index) => (
                            <AccordionItem
                                key={plan.id || index}
                                value={plan.id || `plan-${index}`}
                                className={cn(
                                    "rounded-[20px] border px-4 shadow-[0px_0px_18px_0px_#00000014] overflow-hidden",
                                    plan.popular
                                        ? "bg-[#304C61] border-transparent text-white"
                                        : "bg-white border-[#F3F4F6] text-[#0A1B28]"
                                )}
                            >
                                <AccordionTrigger
                                    className={cn(
                                        "py-5 hover:no-underline items-center [&>svg]:size-5",
                                        plan.popular ? "text-white [&>svg]:text-white" : "text-[#0A1B28]"
                                    )}
                                >
                                    <div className="flex flex-1 flex-col gap-3 pr-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h4 className={cn("text-[22px] font-bold", plan.popular ? "text-white" : "text-[#0A1B28]")}>
                                                    {plan.name[language] || plan.name.en}
                                                </h4>
                                                <p className={cn("mt-1 text-[15px] leading-relaxed", plan.popular ? "text-gray-300" : "text-[#393E41]")}>
                                                    {plan.description[language] || plan.description.en}
                                                </p>
                                            </div>
                                            {plan.popular && (
                                                <span className="shrink-0 bg-primary text-white text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-tighter">
                                                    {t.mostPopular}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-[24px] font-black leading-none tracking-tighter">
                                                {formatPrice(isAnnual ? plan.annualPrice : plan.monthlyPrice, language === "de" ? "de-DE" : "en-US")}
                                            </span>
                                            <span className={cn("text-base font-medium", plan.popular ? "text-gray-300" : "text-[#393E41]")}>
                                                {t.perMonth}
                                            </span>
                                        </div>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="pb-5">
                                    <div className={cn("pt-5 border-t", plan.popular ? "border-[#FFFFFF33]" : "border-[#EAECF0]")}>
                                        <div className="mb-8">
                                            {renderPlanFeatures(plan)}
                                        </div>
                                        {renderPlanButton(plan)}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={plan.id || index}
                                className={cn(
                                    "relative p-4  rounded-[20px] border flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 shadow-[0px_0px_18px_0px_#00000014]",
                                    plan.popular
                                        ? "bg-[#304C61] border-transparent text-white shadow-xl  z-10"
                                        : "bg-white border-[#F3F4F6] text-[#0A1B28] shadow-sm"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute top-5 right-5 bg-primary text-white text-[10px] font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-tighter">
                                        {t.mostPopular}
                                    </div>
                                )}

                                <div className="mb-2">
                                    <h4 className={cn("text-[22px] font-bold md:mb-4 mb-2", plan.popular ? "text-white" : "text-[#0A1B28]")}>
                                        {plan.name[language] || plan.name.en}
                                    </h4>
                                    <p className={cn("text-[15px] leading-relaxed min-h-[48px]", plan.popular ? "text-gray-300" : "text-[#393E41]")}>
                                        {plan.description[language] || plan.description.en}
                                    </p>
                                </div>

                                <div className={cn("mb-8 flex items-baseline gap-1.5 pb-6 border-b", plan.popular ? "border-[#FFFFFF33]" : "border-[#EAECF0]")}>
                                    <span className="md:text-[32px] text-[22px] font-black leading-none tracking-tighter">
                                        {formatPrice(isAnnual ? plan.annualPrice : plan.monthlyPrice, language === "de" ? "de-DE" : "en-US")}
                                    </span>
                                    <span className={cn("text-lg font-medium", plan.popular ? "text-gray-300" : "text-[#393E41]")}>
                                        {t.perMonth}
                                    </span>
                                </div>

                                <div className="flex-grow mb-10">
                                    {renderPlanFeatures(plan)}
                                </div>

                                {renderPlanButton(plan)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Price;
