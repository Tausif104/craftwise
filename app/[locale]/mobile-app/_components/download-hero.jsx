"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Smartphone, Shield, Download } from "lucide-react";
import { AppStoreBadge, PlayStoreBadge } from "./store-badge";

const DownloadHero = () => {
  const isDe = useLocale() === "de";

  const infoBadges = [
    { icon: Shield, label: isDe ? "Für die Baustelle gemacht" : "Built for the jobsite" },
    { icon: Smartphone, label: "iOS & Android" },
    { icon: Download, label: isDe ? "Kostenlos installieren" : "Free to install" },
  ];

  return (
    <section className="relative w-full pt-[120px] sm:pt-[150px] md:pt-[112px] xl:pt-[180px] pb-[60px] md:pb-[80px] xl:pb-[100px] overflow-hidden">
      <div className="absolute hidden lg:block inset-0 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: `url('/images/bg/hero-bg.jpg')` }} />
      <div className="absolute lg:hidden inset-0 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: `url('/images/bg/mobile-bg.png')` }} />

      <div className="container relative z-10 px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          <div className="text-center lg:text-start lg:max-w-[620px]">
            <div className="flex items-center gap-1.5 font-medium text-sm lg:text-[16px] justify-center lg:justify-start">
              <Link href="/" className="text-primary cursor-pointer hover:underline">Home</Link>
              <span className="text-[#393E41]">–</span>
              <span className="text-[#393E41]">Mobile App</span>
            </div>

            <h1 className="text-[30px] md:text-[46px] lg:text-[56px] font-bold leading-[1.15] mt-4 md:mt-6">
              {isDe ? (
                <>
                  <span className="text-text-secondary">Dein Handwerksbetrieb. </span>
                  <br className="hidden sm:block" />
                  <span className="text-primary">Immer dabei.</span>
                </>
              ) : (
                <>
                  <span className="text-text-secondary">Run Your Trade </span>
                  <span className="text-primary">From</span>
                  <br className="hidden sm:block" />
                  <span className="text-text-secondary"> Your Pocket.</span>
                </>
              )}
            </h1>

            <p className="text-base lg:text-lg text-[#393E41] mt-4 lg:mt-5 leading-[26px]">
              {isDe
                ? "Die CraftWise Mobile App bündelt Angebote, Termine, Zeiterfassung, Fotos und Teamchat an einem Ort – direkt auf deinem iPhone oder Android-Gerät."
                : "The CraftWise mobile app keeps quotes, schedules, time tracking, photos, and team chat in one place — right on your iPhone or Android device."}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {infoBadges.map(({ icon: Icon, label }, i) => (
                <div key={label} className="flex items-center gap-3 sm:gap-4">
                  {i > 0 && (
                    <span className="hidden sm:block w-px h-5 bg-[#393E41]/20" />
                  )}
                  <div className="flex items-center gap-2">
                    <Icon className="w-[18px] h-[18px] text-primary shrink-0" />
                    <span className="text-sm lg:text-[15px] font-medium text-[#393E41]">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 lg:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <AppStoreBadge href="#" topText={isDe ? "Laden im" : "Download on the"} />
              <PlayStoreBadge href="#" topText={isDe ? "Erhältlich bei" : "Get it on"} />
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end mt-6 lg:mt-0">
            <Image
              src={
                isDe
                  ? "/images/download/download-hero-german.webp"
                  : "/images/download/download-hero.svg"
              }
              alt="CraftWise mobile app on iPhone and Android"
              width={650}
              height={500}
              className="w-full max-w-[500px] lg:max-w-[650px] h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadHero;
