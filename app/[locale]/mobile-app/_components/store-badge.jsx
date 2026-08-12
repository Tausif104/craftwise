"use client";
import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export function AppStoreBadge({ href = "#", className = "", topText = "Download on the" }) {
  return (
    <Link
      href={href}
      aria-label={`${topText} App Store`}
      className={`shine-btn group inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-black text-white border border-white/10 hover:border-primary/60 transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <FaApple className="w-7 h-7" aria-hidden />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-[11px] opacity-80 uppercase tracking-wide">{topText}</span>
        <span className="text-lg font-semibold">App Store</span>
      </div>
    </Link>
  );
}

export function PlayStoreBadge({ href = "#", className = "", topText = "Get it on" }) {
  return (
    <Link
      href={href}
      aria-label={`${topText} Google Play`}
      className={`shine-btn group inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-black text-white border border-white/10 hover:border-primary/60 transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <FaGooglePlay className="w-6 h-6" aria-hidden />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-[11px] opacity-80 uppercase tracking-wide">{topText}</span>
        <span className="text-lg font-semibold">Google Play</span>
      </div>
    </Link>
  );
}
