"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegistrationForm({ locale, labels }) {
  const [email, setEmail] = useState("");
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!EMAIL_RE.test(email.trim())) {
      setError(labels.errorInvalidEmail);
      return;
    }
    if (!consentTerms || !consentPrivacy) {
      setError(labels.errorConsents);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          locale,
          consentTerms,
          consentPrivacy,
          consentMarketing,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        if (data?.error === "invalid_email") setError(labels.errorInvalidEmail);
        else if (data?.error === "consents_required")
          setError(labels.errorConsents);
        else setError(labels.errorServer);
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch (err) {
      console.error(err);
      setError(labels.errorServer);
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L20 7"
              stroke="#CC8640"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-[24px] md:text-[28px] font-bold text-text-secondary mb-3">
          {labels.successTitle}
        </h2>
        <p className="text-[#393E41] text-base md:text-lg leading-relaxed">
          {labels.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Email input with icon */}
      <div className="flex items-center gap-3 bg-[#F5F5F5] border border-black/10 rounded-lg px-4 py-4">
        <Image
          src="/images/registration/email-icon.svg"
          alt=""
          width={24}
          height={24}
          className="shrink-0 opacity-70"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.emailPlaceholder}
          required
          className="w-full bg-transparent outline-none text-base text-[#393E41] placeholder:text-[#393E41]/50"
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <Checkbox
          checked={consentTerms}
          onChange={setConsentTerms}
          label={
            <>
              {labels.consentTerms}{" "}
              <Link
                href="/terms-conditions"
                target="_blank"
                className="text-primary hover:underline font-semibold underline"
              >
                {labels.termsLinkText}.*
              </Link>
            </>
          }
        />
        <Checkbox
          checked={consentPrivacy}
          onChange={setConsentPrivacy}
          label={
            <>
              {labels.consentPrivacy}{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-primary hover:underline font-semibold underline"
              >
                {labels.privacyLinkText}.*
              </Link>
            </>
          }
        />
        <Checkbox
          checked={consentMarketing}
          onChange={setConsentMarketing}
          label={labels.consentMarketing}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {/* Submit button — gradient teal matching SecondaryBtn */}
      <div className="space-y-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="s_btn group relative overflow-hidden w-full inline-flex items-center justify-center gap-2.5 px-8 py-[22px] text-white text-lg font-normal rounded-full bg-[linear-gradient(152deg,_#012E33_1.73%,_#304C61_96.56%)] shadow-[0px_10px_30px_rgba(1,46,51,0.4)] transition-all duration-300 ease-out hover:shadow-[0px_20px_50px_rgba(1,46,51,0.6)] focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-y-10 -left-1/2 w-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent rotate-12 translate-x-[-60%] transition-transform duration-700 ease-out group-hover:translate-x-[60%]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)] transition-opacity duration-300 group-hover:opacity-100"
          />
          <span className="relative z-10 inline-flex items-center gap-2.5">
            <span className="transition-transform duration-300 group-hover:translate-x-[2px]">
              {status === "submitting" ? labels.submitting : labels.submit}
            </span>
            {status !== "submitting" && (
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </span>
        </button>

        <p className="text-base text-[#393E41] leading-[26px]">
          {labels.legalNote}
        </p>
      </div>
    </form>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 min-w-[20px] h-5 mt-0.5 rounded-sm border border-black/20 bg-transparent checked:bg-primary checked:border-primary appearance-none cursor-pointer transition-all relative checked:after:content-[''] checked:after:absolute checked:after:left-[6px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-white checked:after:rotate-45"
      />
      <span className="text-base text-[#0A1B28] leading-[26px] group-hover:text-text-secondary transition-colors">
        {label}
      </span>
    </label>
  );
}
