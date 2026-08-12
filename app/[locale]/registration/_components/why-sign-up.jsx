import Image from "next/image";

const featuresEn = [
  {
    icon: "/images/registration/fi_17468657.svg",
    title: "Beta Access First",
    text: "Be one of the first to explore Craftwise and benefit from new features early.",
  },
  {
    icon: "/images/registration/fi_16260.svg",
    title: "Launch-only Offers",
    text: "Secure exclusive launch promotions and attractive early-bird conditions.",
  },
  {
    icon: "/images/registration/fi_1827347.svg",
    title: "Stay Informed",
    text: "Receive important product updates and launch news before the official release.",
  },
  {
    icon: "/images/registration/fi_11213197.svg",
    title: "Your Feedback Matters",
    text: "Help us shape the best platform for trade and construction businesses.",
  },
];

const featuresDe = [
  {
    icon: "/images/registration/fi_17468657.svg",
    title: "Beta-Zugang zuerst",
    text: "Teste CraftWise frühzeitig und entdecke neue Funktionen vor dem offiziellen Launch.",
  },
  {
    icon: "/images/registration/fi_16260.svg",
    title: "Exklusive Startangebote",
    text: "Sichere dir besondere Launch-Angebote und attraktive Early-Bird-Konditionen.",
  },
  {
    icon: "/images/registration/fi_1827347.svg",
    title: "Immer informiert bleiben",
    text: "Erhalte wichtige Produktupdates und Launch-News vor der Veröffentlichung.",
  },
  {
    icon: "/images/registration/fi_11213197.svg",
    title: "Dein Feedback zählt",
    text: "Hilf mit, CraftWise optimal auf Handwerks- und Baubetriebe auszurichten.",
  },
];

const trustBadgesEn = [
  { icon: "/images/registration/fi_13722759.svg", label: "GDPR compliant" },
  { icon: "/images/registration/fi_17508481.svg", label: "Double opt-in" },
  { icon: "/images/registration/fi_9542733.svg", label: "Secure data processing" },
];

const trustBadgesDe = [
  { icon: "/images/registration/fi_13722759.svg", label: "DSGVO-konform" },
  { icon: "/images/registration/fi_17508481.svg", label: "Double-Opt-in" },
  { icon: "/images/registration/fi_9542733.svg", label: "Sichere Datenverarbeitung" },
];

const WhySignUp = ({ locale = "de" }) => {
  const isDe = locale === "de";
  const features = isDe ? featuresDe : featuresEn;
  const trustBadges = isDe ? trustBadgesDe : trustBadgesEn;
  return (
    <section className="bg-color-gap bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-medium uppercase tracking-wider text-sm md:text-base lg:text-lg">
            {isDe ? "FRÜH DABEI SEIN" : "WHY JOIN EARLY"}
          </p>
          <h2 className="text-[26px] sm:text-[32px] md:text-4xl lg:text-[48px] font-bold text-text-secondary mt-2 leading-[1.2]">
            {isDe ? "Warum jetzt eintragen?" : "Why Sign Up Now?"}
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {features.map(({ icon, title, text }) => (
            <div
              key={title}
              className="group rounded-2xl bg-white shadow-[0_0_18px_rgba(0,0,0,0.08)] p-5 sm:p-5 lg:py-[30px] lg:px-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(1,46,51,0.12)]"
            >
              <div className="w-20 h-20 sm:w-[90px] sm:h-[90px] lg:w-[110px] lg:h-[110px] rounded-full bg-[#F5EDE4] flex items-center justify-center">
                <Image
                  src={icon}
                  alt={title}
                  width={50}
                  height={50}
                  className="w-9 h-9 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px]"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-[26px] font-bold text-[#0A1B28] mt-5 sm:mt-6 lg:mt-9 leading-snug lg:leading-[34px]">
                {title}
              </h3>
              <p className="text-[#393E41] mt-2.5 sm:mt-3 lg:mt-3.5 leading-relaxed text-sm sm:text-base">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 bg-[#F8FBFF] border border-[#C8DEF7] rounded-xl sm:rounded-[20px] p-5 sm:p-6 lg:py-[30px] lg:px-[30px] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
          {trustBadges.map(({ icon, label }, i) => (
            <div key={label} className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-4 sm:gap-0">
              {i > 0 && (
                <>
                  <div className="hidden sm:block w-px h-[34px] bg-[#C8DEF7] mx-4 md:mx-6 lg:mx-8" />
                  <div className="sm:hidden w-[60%] h-px bg-[#C8DEF7]" />
                </>
              )}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <Image
                  src={icon}
                  alt=""
                  width={28}
                  height={28}
                  className="w-6 h-6 sm:w-7 sm:h-7"
                />
                <span className="text-base sm:text-lg lg:text-xl font-semibold text-black">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySignUp;
