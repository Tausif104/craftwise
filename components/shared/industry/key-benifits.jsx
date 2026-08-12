"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import CommonCardTwoTab from "@/components/global/common-card-two-tab";

/**
 * data shape:
 * {
 *  headingParts: [
 *    { text: "Key Benefits for", className: "text-secondary" },
 *    { text: "Electricians", className: "text-primary" },
 *  ],
 *  items: [
 *    { id: 1, icon: "/icons/x.svg", title: "Clear Scheduling", text: "..." },
 *  ]
 * }
 */

const KeyBenefits = ({ data }) => {
  const safe = data || {};
  const headingParts = Array.isArray(safe.headingParts) ? safe.headingParts : null;
  const items = Array.isArray(safe.items) ? safe.items : [];
  const [activeItem, setActiveItem] = useState(0);
  const [mobileCardMinHeight, setMobileCardMinHeight] = useState(0);
  const mobileMeasureRefs = useRef([]);

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
  }, [items, syncMobileCardHeights]);

  return (
    <section className="sec-padding-top sec-padding-bottom bg-[#F8FBFF]">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          {headingParts ? (
            <h2 className="text-secondary">
              {headingParts.map((p, i) => (
                <span key={i} className={`${p.className || ""} ${i ? "ml-2" : ""}`}>
                  {p.text}
                </span>
              ))}
            </h2>
          ) : (
            <h2 className="text-secondary">{safe.heading}</h2>
          )}
        </div>

        {/* Mobile tabs */}
        <div className="lg:hidden">
          <div className="relative mb-3 mt-8">
            <div className="navigation">
              <ul>
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    className={`list ${index === activeItem ? "active" : ""}`}
                  >
                    <button
                      type="button"
                      className="a"
                      onClick={() => setActiveItem(index)}
                      aria-label={item.title}
                      aria-pressed={index === activeItem}
                    >
                      {item.icon ? (
                        <span className="icon">
                          <Image
                            src={item.svg}
                            alt={item.title || "icon"}
                            width={25}
                            height={25}
                            className="h-8 w-8 transition-all duration-300"
                          />
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
                <div className="indicator" aria-hidden="true"></div>
              </ul>
            </div>
          </div>

          <div className="tab-content relative grid">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 opacity-0" aria-hidden="true">
              {items.map((item, index) => (
                <div
                  key={`measure-${item.id}`}
                  ref={(element) => {
                    mobileMeasureRefs.current[index] = element;
                  }}
                >
                  <CommonCardTwoTab
                    icon={item.icon}
                    title={item.title}
                    description={item.text}
                  />
                </div>
              ))}
            </div>

            {items.map((item, index) => (
              <div
                key={item.id}
                className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                  index === activeItem
                    ? "visible opacity-100"
                    : "invisible pointer-events-none opacity-0"
                }`}
                style={{
                  minHeight: mobileCardMinHeight
                    ? `${mobileCardMinHeight}px`
                    : undefined,
                }}
                aria-hidden={index !== activeItem}
              >
                <CommonCardTwoTab
                  icon={item.icon}
                  title={item.title}
                  description={item.text}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden grid-cols-1 gap-6 lg:grid lg:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-[16px] bg-white p-5 transition-transform duration-300 md:hover:-translate-y-2 lg:p-7.5"
              style={{ boxShadow: "0px 0px 18px rgba(0,0,0,0.08)" }}
            >
              {/* Icon circle */}
              <div className="w-20 h-20 lg:w-27.5 lg:h-27.5 flex-shrink-0">
                {item.icon ? (
                  <Image
                    src={item.icon}
                    alt={item.title || "icon"}
                    width={110}
                    height={110}
                  />
                ) : null}
              </div>

              {/* Content */}
              <div>
                <h4 className="text-[#0A1B28] font-bold  mb-2">
                  {item.title}
                </h4>
                <p className="text-[#5E666B]  leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
