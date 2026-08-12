'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';

const Faq = ({ items }) => {
    const t = useTranslations('PricingFaq');

    // CMS-managed when available; the translated copy is the fallback.
    const fallbackItems = [
        { question: t('q1'), answer: t('a1') },
        { question: t('q2'), answer: t('a2') },
        { question: t('q3'), answer: t('a3') },
        { question: t('q4'), answer: t('a4') },
        { question: t('q5'), answer: t('a5') },
        { question: t('q6'), answer: t('a6') },
        { question: t('q7'), answer: t('a7') },
    ];

    const faqItems = items?.length ? items : fallbackItems;

    return (
        <section className="sec-padding-top sec-padding-bottom">
            <div className="container">
                <h3 className="text-center">{t('heading')}</h3>
                <div className="inner-gap max-w-[920px] mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-0">
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
