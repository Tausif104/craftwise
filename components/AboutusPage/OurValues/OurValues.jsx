"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CommonCard from "@/components/global/CommonCard";
import CommonCardTwoTab from "@/components/global/common-card-two-tab";

const icons = [
    "/icons/about/fi_1342014.svg",
    "/icons/about/fi_5465754.svg",
    "/icons/about/fi_3713767.svg",
    "/icons/about/fi_9958980.svg",
    "/icons/about/fi_9602107.svg",
    "/icons/about/fi_2210266.svg",
];

const OurValues = () => {
    const t = useTranslations("OurValues");
    const [activeItem, setActiveItem] = useState(0);
    const [mobileCardMinHeight, setMobileCardMinHeight] = useState(0);
    const mobileMeasureRefs = useRef([]);

    const valuesData = [
        { icon: icons[0], title: t("card1Title"), description: t("card1Text") },
        { icon: icons[1], title: t("card2Title"), description: t("card2Text") },
        { icon: icons[2], title: t("card3Title"), description: t("card3Text") },
        { icon: icons[3], title: t("card4Title"), description: t("card4Text") },
        { icon: icons[4], title: t("card5Title"), description: t("card5Text") },
        { icon: icons[5], title: t("card6Title"), description: t("card6Text") },
    ];

    const syncMobileCardHeights = useCallback(() => {
        const cards = mobileMeasureRefs.current.filter(Boolean);

        if (!cards.length) {
            setMobileCardMinHeight(0);
            return;
        }

        const tallestCardHeight = Math.max(
            ...cards.map((card) => Math.ceil(card.scrollHeight))
        );

        setMobileCardMinHeight(tallestCardHeight);
    }, []);

    useEffect(() => {
        syncMobileCardHeights();

        window.addEventListener("resize", syncMobileCardHeights);

        const observer = new ResizeObserver(syncMobileCardHeights);
        mobileMeasureRefs.current.filter(Boolean).forEach((card) => {
            observer.observe(card);
        });

        return () => {
            window.removeEventListener("resize", syncMobileCardHeights);
            observer.disconnect();
        };
    }, [valuesData, syncMobileCardHeights]);

    return (
        <section className="sec-padding-top ">
            <div className="container">
                <h2 className="text-center mb-10">{t("heading")}</h2>

                {/* Mobile tabs */}
                <div className="lg:hidden">
                    <div className="relative mb-3 mt-8">
                        <div className="navigation">
                            <ul>
                                {valuesData.map((item, index) => (
                                    <li
                                        key={item.title}
                                        className={`list ${index === activeItem ? "active" : ""}`}
                                    >
                                        <button
                                            type="button"
                                            className="a"
                                            onClick={() => setActiveItem(index)}
                                            aria-label={item.title}
                                            aria-pressed={index === activeItem}
                                        >
                                            <span className="icon">
                                                <Image
                                                    src={item.icon}
                                                    alt={item.title || "icon"}
                                                    width={25}
                                                    height={25}
                                                    className="h-8 w-8 transition-all duration-300"
                                                />
                                            </span>
                                        </button>
                                    </li>
                                ))}
                                <div className="indicator" aria-hidden="true"></div>
                            </ul>
                        </div>
                    </div>

                    <div className="tab-content relative grid">
                        <div
                            className="pointer-events-none absolute inset-x-0 top-0 -z-10 opacity-0"
                            aria-hidden="true"
                        >
                            {valuesData.map((item, index) => (
                                <div
                                    key={`measure-${item.title}`}
                                    ref={(element) => {
                                        mobileMeasureRefs.current[index] = element;
                                    }}
                                >
                                    <CommonCardTwoTab
                                        icon={item.icon}
                                        title={item.title}
                                        description={item.description}
                                    />
                                </div>
                            ))}
                        </div>

                        {valuesData.map((item, index) => (
                            <div
                                key={item.title}
                                className={`col-start-1 row-start-1 rounded-xl transition-opacity duration-300 ${
                                    index === activeItem
                                        ? "visible opacity-100"
                                        : "invisible pointer-events-none opacity-0"
                                }`}
                                style={{
                                    minHeight: mobileCardMinHeight
                                        ? `${mobileCardMinHeight}px`
                                        : undefined,
                                    boxShadow: "0px 0px 18px rgba(0, 0, 0, 0.08)",
                                }}
                                aria-hidden={index !== activeItem}
                            >
                                <CommonCardTwoTab
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop grid */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-4 md:gap-7 pb-8">
                    {valuesData.map((item, index) => (
                        <CommonCard
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurValues;
