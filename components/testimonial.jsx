"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";


import { FaStar } from "react-icons/fa";

export default function TestimonialSection({ data, bg, heading, subtext }) {
  const testimonials = data
  return (
    <section className={`sec-padding-top sec-padding-bottom overflow-x-hidden ${bg ? `bg-[${bg}]` : ''} testimonials`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 xl:mb-14">
          <h2 className="">
            {heading || testimonials?.title || "What Our Clients Say"}
          </h2>
          {(subtext || testimonials?.description) && (
            <p className="text-[20px] text-[#393E41] mt-5 max-w-2xl mx-auto">
              {subtext || testimonials.description}
            </p>
          )}
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 2500,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-[60px]!"
        >
          {testimonials?.items?.map((item) => (
            <SwiperSlide key={item.id}>
              <TestimonialCard item={item} avatarBasePath={testimonials?.avatarBasePath} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

/* 🔹 Card */
function getGeneratedAvatarPath(basePath, clientName) {
  if (!basePath || !clientName) return null;

  const slug = clientName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${basePath}/${slug}.png`;
}

function TestimonialCard({ item, avatarBasePath }) {
  const avatar = item.avatar || getGeneratedAvatarPath(avatarBasePath, item.client_name || item.name);
  return (
    <div className="h-full border border-[#B9C9FF]/20 flex flex-col bg-white px-6 py-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl
      "
    >
      {/* Rating + Date */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-1 text-[#FF9F1C]">
          {Array.from({ length: item.rating }).map((_, i) => (
            <span key={i}><FaStar className="text-[#304C61]" /></span>
          ))}
        </div>
        <span className="text-base text-[#4F4C4B]">{item.date}</span>
      </div>

      {/* Text */}
      <p className="text-base text-[#4F4C4B] leading-relaxed mb-6">
        “{item.text}”
      </p>

      {/* User */}
      <div className="flex items-center gap-3 mt-auto">
        <Image
          src={avatar}
          alt={item.name}
          width={46}
          height={46}
          className="rounded-full object-cover"
        />
        <div>
          <h4 className="text-base font-medium text-[#181818]">
            {item.name}
          </h4>
          <p className="text-sm text-[#4F4C4B]">{item.role}</p>
        </div>
      </div>
    </div>
  );
}
