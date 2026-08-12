"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CommingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: connect API (Mailchimp / Resend / custom backend)
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A1B28] via-[#012E33] to-[#0A1B28] text-white">
      {/* Glow accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/25 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-primary/15 blur-[140px]" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        {/* Brand */}
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium tracking-wide text-white/80 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          CraftWise
        </span>

        {/* Headline */}
        <h1 className="text-5xl font-bold leading-[1.1] md:text-7xl">
          <span className="text-white">CraftWise</span>
          <br />
          <span className="text-primary">Coming Soon</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-white/70">
          We're building something for tradespeople. Join the early access
          list and be the first to know when we launch.
        </p>

        {/* Notify form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
              />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white placeholder-white/50 outline-none transition focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white shadow-lg shadow-primary/30 transition hover:scale-105 active:translate-y-px"
            >
              Notify Me
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <div className="mt-10 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-4 backdrop-blur">
            <CheckCircle2 size={22} className="text-primary" />
            <span className="text-white/90">
              Thanks! We'll let you know when we launch.
            </span>
          </div>
        )}

        <p className="mt-8 text-sm text-white/40">
          &copy; {new Date().getFullYear()} CraftWise. All rights reserved.
        </p>
      </section>
    </main>
  );
}
