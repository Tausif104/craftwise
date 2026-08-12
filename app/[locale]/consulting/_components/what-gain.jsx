"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const WhatGain = () => {
    const t = useTranslations("ConsultingWhatGain");

    const items = [
        { title: t("item1Title"), content: t("item1Text") },
        { title: t("item2Title"), content: t("item2Text") },
        { title: t("item3Title"), content: t("item3Text") },
        { title: t("item4Title"), content: t("item4Text") },
        { title: t("item5Title"), content: t("item5Text") },
    ];

    return (
        <section className="sec-padding-top">
            <div className="bg-secondary lg:py-[100px] py-[60px]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        <div>
                            <h2 className="text-white mb-4 lg:mb-4">
                                {t("headingPart1")}<span className="text-primary">{t("headingHighlight")}</span>{t("headingPart2")}
                            </h2>
                            <p className="text-white mb-8 lg:mb-10 max-w-[550px]">
                                {t("intro")}
                            </p>

                            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
                                {items.map((item, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="border-0 rounded-[12px] px-4 md:px-4 transition-all duration-300 bg-[#3D586E] data-[state=open]:bg-white overflow-hidden shadow-none"
                                    >
                                        <AccordionTrigger className="text-lg md:text-[20px] font-semibold pt-4 pb-4 data-[state=open]:pb-3 hover:no-underline text-white data-[state=open]:text-[#304C61] border-0 rounded-none cursor-pointer [&>svg]:text-white data-[state=open]:[&>svg]:text-text-secondary leading-[1.1]">
                                            {item.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-[#18181899] data-[state=open]:text-gray leading-[1.33] text-sm md:text-[16px] pb-4">
                                            {item.content}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        <div className="relative h-[300px] md:h-[450px] lg:h-[550px] w-full">
                            <Image
                                src="/images/consulting/what-gain.svg"
                                alt="What You Gain With CraftWise"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatGain;
