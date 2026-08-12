"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";

const images = [
    "/images/consulting/process.svg",
    "/images/consulting/appsetup.svg",
    "/images/consulting/digital-transformation.svg",
];

const Service = () => {
    const t = useTranslations("ConsultingService");

    const data = [
        { image: images[0], title: t("card1Title"), description: t("card1Text") },
        { image: images[1], title: t("card2Title"), description: t("card2Text") },
        { image: images[2], title: t("card3Title"), description: t("card3Text") },
    ];

    return (
        <div className="sec-padding-top overflow-x-hidden">
            <div className="container">
                <h2 className="text-center">
                    {t("headingPart1")}<span className="text-primary">{t("headingHighlight")}</span>{t("headingPart2")}
                </h2>

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
                        className='pb-[40px]! swiper-overflow-visible'
                    >
                        {data.map((item) => (
                            <SwiperSlide key={item.title}>
                                <Card item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Desktop Grid */}
                <div className="hidden lg:grid inner-gap grid-cols-3 gap-7 mt-6">
                    {data.map((item, index) => (
                        <Card key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Card = ({ item }) => (
    <div className="flex flex-col gap-4 lg:gap-[28px] items-center bg-white rounded-[16px] shadow-[0px_0px_18px_0px_#00000014] p-2 pt-4 md:px-4 md:pb-10 pb-4 text-center">
        <div className="relative w-full h-[220px] md:h-[260px] rounded-[16px] overflow-hidden">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
        <div>
            <h4 className="text-text-secondary">{item.title}</h4>
            <p className="text-gray pt-3">{item.description}</p>
        </div>
    </div>
);

export default Service;
