"use client";

import { useTranslations } from "next-intl";
import PrimaryBtn from "@/components/global/primary-btn";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const images = [
    "/images/about-us/journey.svg",
    "/images/about-us/build-us.svg",
    "/images/about-us/crew.svg",
];

const GrowWith = () => {
    const t = useTranslations("GrowWith");

    const growWithData = [
        { image: images[0], title: t("card1Title"), description: t("card1Text"), cta: t("card1Cta") },
        { image: images[1], title: t("card2Title"), description: t("card2Text"), cta: t("card2Cta") },
        { image: images[2], title: t("card3Title"), description: t("card3Text"), cta: t("card3Cta") },
    ];

    return (
        <section className="sec-padding-top">
            <div className="bg-secondary lg:py-[90px] py-[60px]">
                <div className="container">
                    <div className="text-center">
                        <h2 className="text-white">{t("headingPart1")}<span className="text-primary">{t("headingHighlight")}</span></h2>
                        <p className="text-white max-w-[740px] mx-auto pt-3 lg:pt-4 md:text-[20px] text-[16px] opacity-70">{t("intro")}</p>
                    </div>
                    <div className="inner-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-7 gap-4">
                        {growWithData.map((item, index) => (
                            <div key={index} className="flex flex-col gap-4 lg:gap-[28px] items-center bg-white rounded-[16px] shadow-[0px_0px_18px_0px_#00000014] p-4 md:p-4 pb-10 text-center">
                                <div className="relative w-full aspect-[389/250]">
                                    <Image src={item.image} alt={item.title} fill className="w-full h-full object-contain" />
                                </div>
                                <div className="">
                                    <h4 className="text-text-secondary">{item.title}</h4>
                                    <p className="text-gray pt-3">{item.description}</p>
                                    <div className="pt-6 pb-4">
                                        {index === 0 ? (
                                            <PrimaryBtn text={item.cta} link="" className="mx-auto max-w-fit" />
                                        ) : (
                                            <Link href="/contact" className="group relative cursor-pointer text-[18px] text-text-secondary hover:text-white px-8.5 py-[11.5px] border inline-flex items-center gap-2 border-primary rounded-full hover:bg-primary transition-all duration-300 overflow-hidden min-w-[260px] justify-center">
                                                <span className="inline-flex items-center gap-2 transition-all duration-300">
                                                    {item.cta} <ArrowRight className="w-5 h-5" />
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowWith;
