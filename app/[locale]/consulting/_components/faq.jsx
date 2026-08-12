"use client";

import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faq = ({ items }) => {
    const t = useTranslations("ConsultingFAQ");

    // CMS-managed when available; the translated copy is the fallback.
    const fallbackItems = [
        { question: t("faq1Question"), answer: t("faq1Answer") },
        { question: t("faq2Question"), answer: t("faq2Answer") },
        { question: t("faq3Question"), answer: t("faq3Answer") },
        { question: t("faq4Question"), answer: t("faq4Answer") },
        { question: t("faq5Question"), answer: t("faq5Answer") },
    ];

    const faqItems = items?.length ? items : fallbackItems;

    return (
        <section className="sec-padding-top sec-padding-bottom">
            <div className="container">
                <h2 className="text-center">{t("heading")}</h2>
                <div className="inner-gap max-w-[920px] mx-auto">
                    <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className='border-0'>
                                <AccordionTrigger className="text-xl font-semibold border-b border-[#D8DAE0] rounded-none data-[state=open]:text-primary cursor-pointer accordion-trigger hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#181818] text-base pb-4 pt-6">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default Faq;
