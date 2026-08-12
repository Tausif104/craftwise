import Image from "next/image";

const featuresEn = [
  {
    icon: "/images/download/fi_7322293.svg",
    title: "Smart Scheduling",
    text: "See your calendar, appointments, and upcoming jobs in one clear mobile view.",
  },
  {
    icon: "/images/download/fi_17281400.svg",
    title: "Time Tracking",
    text: "Create time entries, check in on site, and track working hours directly from your phone.",
  },
  {
    icon: "/images/download/fi_6831818.svg",
    title: "Projects & Tasks",
    text: "Open project details, tasks, and updates wherever the job takes you.",
  },
  {
    icon: "/images/download/fi_1091282.svg",
    title: "Photo Documentation",
    text: "Capture and attach site photos to keep progress and job records up to date.",
  },
  {
    icon: "/images/download/fi_6944072.svg",
    title: "Appointments & Visits",
    text: "View visit details, addresses, maps, and schedules so every team member stays aligned.",
  },
  {
    icon: "/images/download/fi_2312585.svg",
    title: "Team Communication",
    text: "Stay in sync with chats, updates, and important notifications from the field.",
  },
];

const featuresDe = [
  {
    icon: "/images/download/fi_7322293.svg",
    title: "Smarte Einsatzplanung",
    text: "Behalte Kalender, Termine und anstehende Einsätze jederzeit im Blick.",
  },
  {
    icon: "/images/download/fi_17281400.svg",
    title: "Zeiterfassung",
    text: "Erfasse Arbeitszeiten, Pausen und Check-ins direkt vor Ort.",
  },
  {
    icon: "/images/download/fi_6831818.svg",
    title: "Projekte & Aufgaben",
    text: "Öffne Projektdetails, Aufgaben und Updates genau dort, wo gearbeitet wird.",
  },
  {
    icon: "/images/download/fi_1091282.svg",
    title: "Fotodokumentation",
    text: "Lade Baustellenfotos hoch und dokumentiere Fortschritte direkt im Projekt.",
  },
  {
    icon: "/images/download/fi_6944072.svg",
    title: "Termine & Abwesenheiten",
    text: "Sieh Adressen, Besuchsdetails und Zeitpläne auf einen Blick.",
  },
  {
    icon: "/images/download/fi_2312585.svg",
    title: "Teamkommunikation",
    text: "Bleib mit Chat, Updates und Benachrichtigungen immer mit deinem Team verbunden.",
  },
];

const AppFeatures = ({ locale = "de" }) => {
  const isDe = locale === "de";
  const features = isDe ? featuresDe : featuresEn;

  return (
    <section className="bg-color-gap bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm">
            {isDe
              ? "FÜR DIE BAUSTELLE GEMACHT. NICHT FÜR DEN SCHREIBTISCH."
              : "BUILT FOR THE JOBSITE, NOT THE DESK."}
          </p>
          <h2 className="text-[28px] md:text-4xl lg:text-[44px] font-bold text-text-secondary mt-3 leading-tight">
            {isDe ? (
              <>
                Die <span className="text-primary">mobile App</span> für deinen
                Arbeitsalltag im Handwerk.
              </>
            ) : (
              <>
                The strongest <span className="text-primary">mobile app</span> in
                the industry. Manage almost everything right from your phone.
              </>
            )}
          </h2>
        </div>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map(({ icon, title, text }) => (
            <div
              key={title}
              className="group rounded-2xl bg-white border border-[#E3ECF6] p-6 lg:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(1,46,51,0.08)] hover:border-primary/40"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Image src={icon} alt={title} width={36} height={36} />
              </div>
              <h3 className="text-xl font-semibold text-text-secondary mt-5">
                {title}
              </h3>
              <p className="text-text-secondary/70 mt-2 leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
