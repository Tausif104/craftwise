"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import PrimaryBtn from "../global/primary-btn";

export default function RealUseInDailyWorkSection({
  title,
  subtitle,
  steps = [],
  illustration,
  className,
  btn,
}) {
  return (
    <section className={cn("w-full sec-padding-top sec-padding-bottom bg-secondary", className)}>
      <div className="  text-white">
        <div className="mx-auto container px-6">
          <div className="grid items-center md:gap-10 gap-[2px] lg:grid-cols-2">
            {/* Left */}
            <div>
              <h2 className="title">
                {title}
              </h2>
              <p className="mt-3 max-w-xl text-white md:text-[20px] text-[16px]">{subtitle}</p>

              <div className="md:mt-10 mt-6 space-y-5">
                {steps.map((s, idx) => (
                  <div key={idx} className="flex items-start xl:items-center gap-4">
                    <div className="mt-0.5">
                      <div className="flex md:h-[84px] md:w-[84px] h-[60px] w-[60px] items-center justify-center rounded-full bg-white/10">
                        <Image
                          src={s.icon?.src}
                          alt={s.icon?.alt || s.title}
                          width={84}
                          height={84}
                          className="md:h-[84px] md:w-[84px] h-[60px] w-[60px] object-contain"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="">{s.title}</h4>
                      <div className="mt-1 text-base leading-relaxed text-white">
                        {s.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

{
  btn && (
    <div className="md:pt-12 pt-[24px]  ">
      <PrimaryBtn text={btn.text} link={btn.link} />
    </div>
  )
}
              

            </div>

            {/* Right (ONE GROUP IMAGE) */}
            <div className="relative ">
              {/* big soft circle behind, like screenshot */}


              <Card className="relative overflow-hidden  bg-transparent border-0 shadow-none">
                <div className="relative aspect-[1/1] ">
                  <Image
                    src={illustration?.src}
                    alt={illustration?.alt || "Daily work illustration"}

                    fill

                    className="object-contain"

                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
