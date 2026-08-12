"use client"
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

const HowItWorksSection = ({ heading1, headingHighlight, heading2, subtext, steps = [], bottomText }) => {
  return (
    <section className="sec-padding-top sec-padding-bottom bg-[#304C61]">
      <div className="container px-6">
        {/* Section Title */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="mb-5 text-white">
            {heading1}<span className="text-primary">{headingHighlight}</span>{heading2}
          </h2>
          <p className="text-white leading-[1.33] max-sm:text-center">
            {subtext}
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden block ">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={true}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            loop
            navigation
            className="mySwiper pb-10!"
            centeredSlides={true}
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index}>
                <div className="relative text-center bg-[#ffffff09] border border-[#ffffff25] rounded-3xl p-6">
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute right-5 top-1/2 -translate-y-1/2" size={40} color="#fff" />
                  )}
                  <Image
                    src={`/icons/works/${index + 1}.svg`}
                    width={120}
                    height={120}
                    alt={step}
                    className="mx-auto md:max-w-30 max-w-20 w-full"
                  />
                  <h3 className="text-white xl:text-[24px] text-[16px] font-bold mt-7.5 text-center">{step}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="lg:block hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-30 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center bg-[#ffffff09] border border-[#ffffff25] rounded-3xl p-6 relative">
                {index < steps.length - 1 && (
                  <Image
                    className="w-30 absolute -right-30 top-1/2 -translate-y-1/2 lg:block hidden"
                    src="/icons/works/arrow-right.svg"
                    width={40}
                    height={40}
                    alt="arrow-right"
                  />
                )}
                <Image
                  src={`/icons/works/${index + 1}.svg`}
                  width={120}
                  height={120}
                  alt={step}
                  className="mx-auto md:max-w-30 max-w-20 w-full"
                />
                <h3 className="text-white xl:text-[24px] text-[16px] font-bold mt-7.5 text-center">{step}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Line */}
        <div className="md:mt-15 mt-10">
          <p className="text-white md:text-[22px] text-[16px] font-semibold text-center">
            {bottomText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
