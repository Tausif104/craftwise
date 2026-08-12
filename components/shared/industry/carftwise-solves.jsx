"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils"; // if you have it (shadcn). If not, remove cn usage.

const CarftwiseSolves = ({ data, className = "" }) => {
  const safe = data || {};
  const title = safe.title || "";
  const description = safe.description || "";
  const items = Array.isArray(safe.items) ? safe.items : [];

  // ✅ dynamic heading support:
  // Option A: headingParts (like your “How CraftWise Solves Them”)
  // Option B: fallback to "Benefits of CraftWise {title}"
  const headingParts = Array.isArray(safe.headingParts) ? safe.headingParts : null;

  return (
    <section className={cn ? cn("sec-padding-top sec-padding-bottom", className) : `sec-padding-top sec-padding-bottom ${className}`}>
      <div className="container px-6 mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          {headingParts ? (
            <h2 className="text-secondary mb-4">
              {headingParts.map((p, i) => (
                <span key={i} className={`${p.className || ""} ${i ? "ml-1" : ""}`}>
                  {p.text}
                </span>
              ))}
            </h2>
          ) : (
            <h2 className="text-secondary mb-4">
              How <span className="text-primary">CraftWise</span> Solves Them
            </h2>
          )}

          {description ? (
            <p className="text-[#393E41] text-[20px] max-w-[750px] mx-auto">
              {description}
            </p>
          ) : null}
        </div>

        {/* ✅ Grid EXACT like screenshot (2 columns on md+, centered icon circle, equal cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[16px] p-8 text-center transition-transform duration-300 hover:-translate-y-2"
              style={{ boxShadow: "0px 0px 18px rgba(0, 0, 0, 0.08)" }}
            >
              {/* Icon circle */}
              <div className="mx-auto w-20 h-20 lg:w-27.5 lg:h-27.5 mb-4 rounded-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={110}
                  height={110}
                  className="h-auto w-auto"
                />
              </div>

              <h4 className="mb-2 font-bold text-[#0A1B28] ">
                {item.title}
              </h4>

              <p className="text-[#393E41] text-[16px] leading-relaxed max-w-[360px] mx-auto">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarftwiseSolves;
