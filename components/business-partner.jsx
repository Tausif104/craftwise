"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SecoundaryBtn from "./global/secoundary-btn";

const imagesEn = [
  "/images/thumbs/business-partne-thumb-01.svg",
  "/images/thumbs/business-partne-thumb-02.svg",
  "/images/thumbs/business-partne-thumb-03.svg",
];

const imagesDe = [
  "/images/german/business-partne-thumb-01-g.svg",
  "/images/german/business-partne-thumb-02-g .svg",
  "/images/german/business-partne-thumb-03-g.svg",
];

const BusinessPartner = () => {
  const t = useTranslations("BusinessPartner");
  const locale = useLocale();
  const images = locale === "de" ? imagesDe : imagesEn;
  const [activeValue, setActiveValue] = useState("item-0");

  const consultingItems = [
    { title: t("accordion1Title"), content: t("accordion1Text") },
    { title: t("accordion2Title"), content: t("accordion2Text") },
    { title: t("accordion3Title"), content: t("accordion3Text") },
  ];

  const activeIndex = useMemo(() => {
    const n = Number(activeValue?.replace("item-", ""));
    return Number.isFinite(n) ? Math.max(0, Math.min(n, images.length - 1)) : 0;
  }, [activeValue]);

  const activeImage = images[activeIndex];

  return (
    <section className="sec-padding-top sec-padding-bottom">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT CONTENT */}
          <div>
            <h3 className="mb-6 text-center lg:text-left text-balance">
              {t("heading")}{" "}
              <span className="text-primary">{t("headingHighlight")}</span>
            </h3>

            <Accordion
              type="single"
              collapsible
              value={activeValue}
              onValueChange={(val) => setActiveValue(val || "item-0")}
              className="space-y-4"
            >
              {consultingItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-[#B9C9FF] last:border-b rounded-[15px] px-3 md:px-4 overflow-hidden
                    transition-all duration-300
                    data-[state=open]:border-primary/50
                    data-[state=open]:shadow-[0px_5px_18px_0px_#0000000D]"
                >
                  {activeValue === `item-${index}` && (
                    <div className="relative mb-4 flex justify-center lg:hidden">
                      <Image
                        src={images[index]}
                        alt={`Business Consulting Illustration ${index + 1}`}
                        width={320}
                        height={180}
                        className="object-contain"
                        priority
                      />
                    </div>
                  )}

                  <AccordionTrigger className="text-lg md:text-[20px] font-semibold py-4 hover:no-underline data-[state=open]:text-primary">
                    {item.title}
                  </AccordionTrigger>

                  <AccordionContent className="text-gray leading-relaxed text-sm md:text-[16px] pb-4">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center lg:text-left">
              <SecoundaryBtn text={t("cta")} link="/consulting" />
            </div>
          </div>

          {/* RIGHT IMAGE (only visible on larger screens) */}
          <div className="relative h-[320px] md:h-[420px] lg:h-[480px] w-full hidden lg:block">
            {images.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={image}
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                    isActive
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Business Consulting Illustration ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={isActive}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPartner;
