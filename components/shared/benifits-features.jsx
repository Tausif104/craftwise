"use client";

import CommonCardTwoTab from '@/components/global/common-card-two-tab';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const BenifitsFeatures = ({ data }) => {
  const { title, items, description, heading } = data;
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

    window.addEventListener('resize', syncMobileCardHeights);

    const observer = new ResizeObserver(syncMobileCardHeights);
    mobileMeasureRefs.current.filter(Boolean).forEach((card) => {
      observer.observe(card);
    });

    return () => {
      window.removeEventListener('resize', syncMobileCardHeights);
      observer.disconnect();
    };
  }, [items, syncMobileCardHeights]);

  return (
    <section className="sec-padding-top sec-padding-bottom benifits-features">
      <div className="container px-6 mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-secondary mb-4">
            {heading ? heading : (
              <>Benefits of{' '}<span className="text-primary mb-4">CraftWise </span>{title}</>
            )}
          </h2>
          <p className="text-[#393E41] text-[20px] max-w-[750px] mx-auto">
            {description}
          </p>
        </div>

        {/* Mobile tabs */}
        <div className="lg:hidden">
          <div className="relative mb-3 mt-8">
            <div className="navigation">
              <ul>
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    className={`list ${index === activeItem ? 'active' : ''}`}
                  >
                    <button
                      type="button"
                      className="a"
                      onClick={() => setActiveItem(index)}
                      aria-label={item.title}
                      aria-pressed={index === activeItem}
                    >
                      {item.svg ? (
                        <span className="icon">
                          <Image
                            src={item.svg}
                            alt={item.title || 'icon'}
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
            <div
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 opacity-0"
              aria-hidden="true"
            >
              {items.map((item, index) => (
                <div
                  key={`measure-${item.id}`}
                  ref={(element) => {
                    mobileMeasureRefs.current[index] = element;
                  }}
                >
                  <CommonCardTwoTab
                    icon={item.image}
                    title={item.title}
                    description={item.text}
                  />
                </div>
              ))}
            </div>

            {items.map((item, index) => (
              <div
                key={item.id}
                className={`col-start-1 row-start-1 rounded-xl transition-opacity duration-300 ${
                  index === activeItem
                    ? 'visible opacity-100'
                    : 'invisible pointer-events-none opacity-0'
                }`}
                style={{
                  minHeight: mobileCardMinHeight
                    ? `${mobileCardMinHeight}px`
                    : undefined,
                     boxShadow: '0px 0px 18px rgba(0, 0, 0, 0.08)'
                }}
                aria-hidden={index !== activeItem}
              >
                <CommonCardTwoTab
                  icon={item.image}
                  title={item.title}
                  description={item.text}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-12 gap-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`col-span-12 md:col-span-6 transition-transform duration-300 hover:-translate-y-2 ${
                index >= 3 ? 'lg:col-span-6' : 'lg:col-span-4'
              } bg-white rounded-[16px] p-6`}
              style={{ boxShadow: '0px 0px 18px rgba(0, 0, 0, 0.08)' }}
            >
              {/* SVG Image */}
              <div className="w-27.5 h-27.5 mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={110}
                  height={110}
                />
              </div>

              {/* Content */}
              <h4 className="mb-2 font-bold text-[#0A1B28]">
                {item.title}
              </h4>

              <p className="text-[#393E41]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenifitsFeatures;
