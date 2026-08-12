'use client';
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import QuestionCardBtn from "./question-card-btn";

const FirstQuestion = () => {
    const t = useTranslations('FirstQuestion');
    const [activeIndex, setActiveIndex] = useState(null);

    const handleMobileClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const questions = [
        {
            title: t('card1Title'),
            desc: t('card1Desc'),
            icon: "/images/pricing/q-1.svg",
            btnText: t('card1Cta'),
            link: "/book-demo",
        },
        {
            title: t('card2Title'),
            desc: t('card2Desc'),
            icon: "/images/pricing/q-2.svg",
            btnText: t('card2Cta'),
            link: "/book-demo",
        },
        {
            title: t('card3Title'),
            desc: t('card3Desc'),
            icon: "/images/pricing/q-3.svg",
            btnText: t('card3Cta'),
            link: "/faq",
        },
        {
            title: t('card4Title'),
            desc: t('card4Desc'),
            icon: "/images/pricing/q-4.svg",
            btnText: t('card4Cta'),
            link: "#feature-comparison",
        },
        {
            title: t('card5Title'),
            desc: t('card5Desc'),
            icon: "/images/pricing/q-5.svg",
            btnText: t('card5Cta'),
            link: "/consulting",
        },
    ];

    return (
        <section className="sec-padding-top">
            <div className="container">
                <div className="text-center mx-auto mb-16">
                    <h3 className="mb-6 whitespace-pre-line">{t('heading')}</h3>
                    <p className="max-w-[780px] mx-auto whitespace-pre-line">{t('subtext')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {questions.slice(0, 3).map((q, idx) => (
                        <Card key={idx} {...q} index={idx} handleMobileClick={handleMobileClick} activeIndex={activeIndex} />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
                    {questions.slice(3).map((q, idx) => (
                        <Card key={idx} {...q} index={idx + 3} handleMobileClick={handleMobileClick} activeIndex={activeIndex} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Card = ({ title, desc, icon, btnText, link, index, handleMobileClick, activeIndex }) => (
    <div
        className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-6 transition-all duration-500 ease-in-out group/card relative overflow-hidden"
        onClick={() => handleMobileClick(index)}
    >
        <div className="flex flex-col gap-6 transition-all duration-500 ease-in-out group-hover/card:opacity-0 group-hover/card:scale-95">
            <div className="w-[80px] h-[80px] rounded-full bg-[#FEF4EB] flex items-center justify-center">
                <Image src={icon} alt={title} width={40} height={40} className="object-contain" />
            </div>
            <div>
                <h4 className="text-[#0A1B28] text-[22px] font-bold mb-4">{title}</h4>
                <p className="text-[#393E41] text-[16px] leading-relaxed font-medium">{desc}</p>
            </div>
        </div>

        <div className="absolute inset-0 bg-[#304C61] hidden md:flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 ease-in-out p-8">
            <div className="translate-y-4 group-hover/card:translate-y-0 transition-all duration-500 ease-out delay-100">
                <QuestionCardBtn text={btnText} link={link} />
            </div>
        </div>
        <div className={`absolute inset-0 bg-[#304C61] flex md:hidden items-center justify-center ${
            activeIndex === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } transition-all duration-500 ease-in-out p-8`}>
            <div className={`${activeIndex === index ? "translate-y-0" : "translate-y-4"} transition-all duration-500 ease-out delay-100`}>
                <QuestionCardBtn text={btnText} link={link} />
            </div>
        </div>
    </div>
);

export default FirstQuestion;
