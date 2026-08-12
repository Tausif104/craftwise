'use client';
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PrimaryBtn from "@/components/global/primary-btn";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import "swiper/css";

const WeOffer = () => {
    const t = useTranslations('WeOffer');
    const locale = useLocale();
    const [activeIndex, setActiveIndex] = useState(null);

    const handleMobileClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const cards = [
        {
            title: t('card1Title'),
            icon: "/images/pricing/offer-01.svg",
            desc: t('card1Desc'),
        },
        {
            title: t('card2Title'),
            icon: "/images/pricing/offer-02.svg",
            desc: t('card2Desc'),
        },
        {
            title: t('card3Title'),
            icon: "/images/pricing/offer-03.svg",
            desc: t('card3Desc'),
        },
    ];

    return (
        <section className="sec-padding-top overflow-x-hidden">
            <div className="bg-[#304C61] py-10 lg:py-[100px] text-white overflow-hidden">
                <div className="container">
                    <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
                        <div className="lg:w-1/2">
                            <h3 className="mb-6">
                                {t('kickerBefore')}{locale === 'de' ? <br /> : ' '}<span className="text-primary">CraftWise </span>{t('kickerAfter')}
                            </h3>
                            <h4 className="mb-8">
                                {t('heading')}
                            </h4>
                            <div className="space-y-6 text-lg max-w-[600px] mb-10">
                                <p className="text-[#95A3AF]">{t('body1')}</p>
                                <p className="text-[#95A3AF]">{t.rich('body2', { c: (chunks) => <span className="text-primary font-semibold">{chunks}</span> })}</p>
                                <p className="text-[#95A3AF]">{t('body3')}</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <PrimaryBtn text={t('primaryCta')} link="/consulting#book-now" className="max-w-fit" />
                                <Link
                                    href="/consulting"
                                    className="mr-4 text-[18px] cursor-pointer inline-flex items-center gap-2 text-white px-8.5 py-[11.5px] border border-primary rounded-full hover:bg-primary transition-all duration-300"
                                >
                                    {t('secondaryCta')} <ArrowRight />
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative h-[300px] md:h-[500px] w-full">
                            <Image
                                src="/images/pricing/site.svg"
                                alt="CraftWise Consulting"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center mb-16">
                        <span className="border-t-[1px] w-full border-white"></span>
                        <span className="relative min-w-[230px] whitespace-nowrap text-center text-white z-10 bg-none px-6 text-sm font-bold tracking-[0.2em] uppercase text-gray-400">
                            {t('sectionKicker')}
                        </span>
                        <span className="border-t-[1px] w-full border-white"></span>
                    </div>

                    {/* Mobile + Tablet: Swiper */}
                    <div className='lg:hidden mt-6'>
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={20}
                            autoplay={true}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                640: { slidesPerView: 1.2 },
                                768: { slidesPerView: 2 },
                            }}
                            className='pb-[40px]!'
                        >
                            {cards.map((offer, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="bg-white rounded-[24px] p-8 md:p-10 flex flex-col gap-6 transition-all hover:shadow-xl group">
                                        <div className="w-[80px] h-[80px] rounded-full bg-[#FEF4EB] flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Image
                                                src={offer.icon}
                                                alt={offer.title}
                                                width={40}
                                                height={40}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-[#0A1B28] text-[22px] font-bold mb-4">{offer.title}</h4>
                                            <p className="text-[#393E41] text-[16px] leading-relaxed font-medium">{offer.desc}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Desktop: Grid */}
                    <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cards.map((offer, idx) => (
                            <div key={idx} className="bg-white rounded-[24px] p-8 md:p-10 flex flex-col gap-6 transition-all hover:shadow-xl group">
                                <div className="w-[80px] h-[80px] rounded-full bg-[#FEF4EB] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Image
                                        src={offer.icon}
                                        alt={offer.title}
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-[#0A1B28] text-[22px] font-bold mb-4">{offer.title}</h4>
                                    <p className="text-[#393E41] text-[16px] leading-relaxed font-medium">{offer.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeOffer;
