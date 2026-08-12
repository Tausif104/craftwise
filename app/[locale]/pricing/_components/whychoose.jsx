'use client';
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';

const WhyChoose = () => {
    const t = useTranslations('WhyChoose');

    const items = [
        { title: t('item1Title'), content: t('item1Content') },
        { title: t('item2Title'), content: t('item2Content') },
        { title: t('item3Title'), content: t('item3Content') },
        { title: t('item4Title'), content: t('item4Content') },
        { title: t('item5Title'), content: t('item5Content') },
    ];

    return (
        <section className="sec-padding-top">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="relative h-[300px] md:h-[450px] lg:h-[550px] w-full">
                        <Image
                            src="/images/pricing/why-c.svg"
                            alt="Why Choose CraftWise"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div>
                        <h3 className="mb-10 text-center lg:text-left">
                            {t('heading')} <span className="text-primary">{t('headingHighlight')}</span>
                        </h3>

                        <Accordion
                            type="single"
                            collapsible
                            defaultValue="item-0"
                            className="space-y-4"
                        >
                            {items.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="rounded-[15px] border border-[#0000000F] px-6 overflow-hidden transition-all duration-300 data-[state=open]:border-primary data-[state=open]:shadow-md"
                                >
                                    <AccordionTrigger className="text-[18px] md:text-[20px] font-bold py-5 hover:no-underline text-[#304C61] data-[state=open]:text-primary border-none!">
                                        {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-[#393E41] leading-relaxed text-[16px] pb-6 font-medium">
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

export default WhyChoose;
