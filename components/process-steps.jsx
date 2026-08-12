"use client";

import { processSteps } from "@/data/processSteps";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function ProcessSection() {
  const t = useTranslations("ProcessSection");
  const [activeStep, setActiveStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  const steps = processSteps.map((step) => ({
    ...step,
    title: t(`step${step.id}Title`),
    text: t(`step${step.id}Text`),
  }));

  // Start animation only after section scrolls into view (+ delay).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasStarted) return undefined;

    let delayTimer;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          delayTimer = window.setTimeout(() => setHasStarted(true), 1500);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearTimeout(delayTimer);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || steps.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, [hasStarted, steps.length]);

  return (
    <section ref={sectionRef} className="bg-[#2F4E63] sec-padding-top sec-padding-bottom text-white process-steps">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-[111px]">
          <h2>
            {t("headingLine1")} <br />
            {t("headingLine2")}<span className="text-primary">{t("headingHighlight")}</span>
          </h2>
        </div>

        {/* DESKTOP HORIZONTAL */}
        <div className="hidden lg:block relative">
          <div className="absolute top-8.5 left-37.5 right-37.5">
            <Image src="/images/arrow-line.svg" width={1100} height={1} alt="" />
          </div>

          <div className="grid grid-cols-4 gap-10 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="text-center flex flex-col items-center">
                <StepIcon icon={step.icon} isActive={index === activeStep} />
                <h4 className={`mt-8 font-semibold transition-colors duration-500 ${index === activeStep ? "text-primary" : "text-white"}`}>{step.title}</h4>
                <p className={`mt-3 text-base max-w-[250px] transition-colors duration-500 ${index === activeStep ? "text-white" : "text-white/70"}`}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE VERTICAL */}
        <div className="lg:hidden relative">
          <div className="absolute right-6 top-0 bottom-0 border-white">
            <Image src="/images/arrow-line-v.svg" width={40} height={1100} alt="" />
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col gap-4">
                <StepIcon icon={step.icon} isActive={index === activeStep} />
                <div>
                  <h4 className={`font-semibold text-[22px] transition-colors duration-500 ${index === activeStep ? "text-primary" : "text-white"}`}>{step.title}</h4>
                  <p className={`mt-3 text-base max-w-[250px] transition-colors duration-500 ${index === activeStep ? "text-white" : "text-white/70"}`}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepIcon({ icon, isActive }) {
  return (
    <div className={`relative z-10 flex h-16 xl:h-19.5 w-16 xl:w-19.5 items-center justify-center rounded-full transition-all duration-500 ${
      isActive
        ? "scale-110 bg-primary text-white shadow-[0_0_0_10px_rgba(255,255,255,0.12)]"
        : "bg-white text-[#2F4E63]"
    }`}>
      <Image src={icon} alt="icon" width={78} height={78} />
    </div>
  );
}
