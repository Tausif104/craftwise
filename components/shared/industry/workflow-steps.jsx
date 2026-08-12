"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";


const WorkflowSteps = ({ data }) => {
  const safe = data || {};
  const heading = safe.heading || "";
  const steps = Array.isArray(safe.steps) ? safe.steps : [];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (steps.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="sec-padding bg-[#304C61]">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h2 className="text-center text-white mb-10">{heading}</h2>

        {/* Desktop / Tablet layout (like screenshot) */}
        <div className="hidden lg:block">
          {/* top numbers + arrows */}

          <div className="relative mb-8">
            <div className="absolute left-0 right-0 top-[36px] h-[4px] bg-primary/80 mx-[100px]" />

            <div className="relative flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.id || i} className="relative flex-1">
                  {/* circle */}
                  <div
                    className={`mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      i === activeStep
                        ? "scale-110 border-primary bg-primary shadow-[0_0_0_10px_rgba(255,255,255,0.12)]"
                        : "border-white bg-white"
                    }`}
                  >
                    <span
                      className={`font-extrabold text-[24px] leading-none transition-colors duration-500 ${
                        i === activeStep ? "text-white" : "text-primary"
                      }`}
                    >
                      {s.id}
                    </span>
                  </div>

                  {/* arrow between circles (centered, like design) */}
                  {i !== steps.length - 1 ? (
                    <div className="absolute top-[36px] right-[-12px] -translate-y-1/2">
                      {/* <span
                        className="block w-0 h-0
              border-t-[8px] border-t-transparent
              border-b-[8px] border-b-transparent
              border-l-[14px] border-l-primary"
                      /> */}
                     <ChevronRight className="text-primary mt-1 text-[36px]" size={42} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* cards row */}
          <div className="grid grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div
                key={s.id || i}
                className={`rounded-[14px] p-6 transition-all duration-500 ${
                  i === activeStep ? "-translate-y-2 bg-white" : "bg-white"
                }`}
                style={{ boxShadow: "0px 0px 18px rgba(0,0,0,0.08)" }}
              >
                {/* icon circle */}
                <div className="mx-auto w-20 h-20 lg:w-27.5 lg:h-27.5 mb-4">
                  {s.icon ? (
                    <Image
                      src={s.icon}
                      alt={s.title || "step icon"}
                      width={110}
                      height={110}
                    />
                  ) : null}
                </div>

                <h4
                  className="mb-2 text-center font-bold text-[#0A1B28]"
                >
                  {s.title}
                </h4>
                <p className="text-center leading-relaxed text-[#5E666B]">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Mobile (previous layout) — only line full + arrow between cards */}
        <div className="lg:hidden space-y-5">
          {steps.map((s, i) => (
            <div key={s.id || i} className="relative flex items-center gap-4">
              {/* LEFT: step + connector (OUTSIDE card) */}
              <div className="relative flex w-[58px] flex-col items-center justify-center self-stretch">
                {/* step circle */}
                <div
                  className={`relative z-20 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    i === activeStep
                      ? "scale-110 border-primary bg-primary shadow-[0_0_0_8px_rgba(255,255,255,0.12)]"
                      : "border-white bg-white"
                  }`}
                >
                  <span
                    className={`font-extrabold transition-colors duration-500 ${
                      i === activeStep ? "text-white" : "text-primary"
                    }`}
                  >
                    {s.id}
                  </span>
                </div>

                {/* ✅ full connector line (till next card) + arrow in middle */}
                {i !== steps.length - 1 ? (
                  <div className="absolute left-1/2 top-1/2 h-[calc(100%+20px)] w-[2px] -translate-x-1/2 bg-primary/80 rounded-full">
                    {/* arrow in middle of the line */}
                    {/* <span
                      className="absolute left-1/2 bottom-[40%] md:bottom-[30%] -translate-x-1/2 -translate-y-1/2
              w-0 h-0
              border-l-[7px] border-l-transparent
              border-r-[7px] border-r-transparent
              border-t-[12px] border-t-primary"
                    /> */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                    <ChevronDown className="text-primary  text-[36px] " size={32} />
                    </div>
                  </div>
                ) : null}
              </div>

              {/* RIGHT: card */}
              <div
                className={`flex-1 rounded-[16px] p-5 transition-all duration-500 ${
                  i === activeStep ? "-translate-y-1 bg-white" : "bg-white"
                }`}
                style={{ boxShadow: "0px 0px 18px rgba(0,0,0,0.08)" }}
              >
                <div className="flex items-start gap-3">
                  {/* icon circle */}
                  <div className="h-[44px] w-[44px] flex-shrink-0">
                    {s.icon ? (
                      <Image
                        src={s.icon}
                        alt={s.title || "icon"}
                        width={44}
                        height={44}
                      />
                    ) : null}
                  </div>

                  <div>
                    <h4 className="text-[16px] font-bold leading-snug text-[#0A1B28]">
                      {s.title}
                    </h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#5E666B]">
                      {s.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSteps;
