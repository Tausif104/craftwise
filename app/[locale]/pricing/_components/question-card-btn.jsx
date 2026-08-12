import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { normalizeLocalizedHref } from "@/lib/normalize-localized-href";

const QuestionCardBtn = ({ text, link, className = "" }) => {
  return (
    <Link
      href={normalizeLocalizedHref(link)}
      className={`s_btn
        group relative isolate overflow-hidden
        inline-flex items-center gap-3
        px-8 py-4
        text-white text-base md:text-[18px] font-medium
        rounded-full
        bg-primary
        shadow-[0px_10px_30px_rgba(1,46,51,0.4)]
        transition-all duration-300 ease-out
        hover:shadow-[0px_20px_50px_rgba(1,46,51,0.6)]
        focus:outline-none focus:ring-2 focus:ring-white/40
        w-full md:w-fit
        ${className}
      `}
    >
      <span
        aria-hidden
        className="
          pointer-events-none absolute inset-0 opacity-0
          bg-[linear-gradient(101.84deg,_#012E33_1.73%,_#304C61_96.56%)]
          transition-opacity duration-300 ease-out
          group-hover:opacity-100
        "
      />
      <span
        aria-hidden
        className="
          pointer-events-none absolute -inset-y-10 -left-1/2 w-[200%]
          bg-gradient-to-r from-transparent via-white/25 to-transparent
          rotate-12 translate-x-[-60%]
          transition-transform duration-700 ease-out
          group-hover:translate-x-[60%]
        "
      />
      <span
        aria-hidden
        className="
          pointer-events-none absolute inset-0 opacity-0
          bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
        <span className="transition-transform duration-300 group-hover:translate-x-[2px]">
          {text}
        </span>
        <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export default QuestionCardBtn;
