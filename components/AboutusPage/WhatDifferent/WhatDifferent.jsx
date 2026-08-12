"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const WhatDifferent = () => {
    const t = useTranslations("WhatDifferent");

    const items = [
        { title: t("item1Title"), content: t("item1Content") },
        { title: t("item2Title"), content: t("item2Content") },
        { title: t("item3Title"), content: t("item3Content") },
        { title: t("item4Title"), content: t("item4Content") },
        { title: t("item5Title"), content: t("item5Content") },
        { title: t("item6Title"), content: t("item6Content") },
    ];

    return (
        <section className="sec-padding-top">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 side-gap items-center">

                    <div className="relative h-[300px] md:h-[450px] lg:h-[500px] w-full">
                        <Image src="/images/about-us/what-defferent.svg" alt="What Makes CraftWise Different" fill className="object-contain" />
                    </div>

                    <div className="flex flex-col">
                        <h2 className="mb-4 lg:mb-7 text-center lg:text-left">
                            {t("headingPart1")}<span className="text-primary">CraftWise</span>{t("headingPart2")}
                        </h2>

                        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
                            {items.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border border-[#C9D6F3] rounded-[15px] px-3 md:px-4 transition-all duration-300 data-[state=open]:border-primary/50 data-[state=open]:shadow-[0px_5px_18px_0px_#0000000D]"
                                >
                                    <AccordionTrigger className="text-lg text-[#304C61] md:text-[20px] font-semibold py-4 hover:no-underline data-[state=open]:text-primary border-0 rounded-none cursor-pointer text-left items-center">
                                        {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-[#181818]/60 leading-relaxed text-sm md:text-[16px] pb-4">
                                        {item.content}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatDifferent;
