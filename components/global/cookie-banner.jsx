"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ALLOW_ALL, DENY_ALL } from "@/lib/consent";
import { useConsent } from "@/components/global/consent-provider";

/**
 * Cookie banner (TTDSG §25).
 *
 * Rules the layout follows, not just decoration:
 *  - Reject is exactly as easy and as visible as Accept — one click, same size.
 *  - Optional categories start switched off; nothing is pre-ticked.
 *  - The banner never blocks the page content behind an opaque overlay, but it
 *    also cannot be dismissed without a decision.
 *  - The decision is revocable at any time via the footer link, which re-opens
 *    the same dialog.
 */

const OPTIONAL_CATEGORIES = ["functional", "statistics"];

export default function CookieBanner() {
  const t = useTranslations("CookieConsent");
  const { consent, hasDecision, save, settingsOpen, openSettings, closeSettings } = useConsent();

  const [draft, setDraft] = useState({
    functional: consent.functional,
    statistics: consent.statistics,
  });

  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Re-opening from the footer must show what is currently stored, not what was
  // toggled and abandoned last time.
  useEffect(() => {
    if (settingsOpen) {
      setDraft({ functional: consent.functional, statistics: consent.statistics });
    }
  }, [settingsOpen, consent.functional, consent.statistics]);

  useEffect(() => {
    if (!settingsOpen) return undefined;

    firstFieldRef.current?.focus();

    const onKeyDown = (event) => {
      // Escape only closes the dialog when a decision already exists —
      // otherwise it would look like a way to skip the question.
      if (event.key === "Escape" && hasDecision) closeSettings();

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [settingsOpen, hasDecision, closeSettings]);

  const showBanner = !hasDecision && !settingsOpen;

  if (!showBanner && !settingsOpen) return null;

  const legalLinks = (
    <span className='flex flex-wrap items-center gap-x-4 gap-y-1'>
      <Link href='/privacy-policy' className='underline underline-offset-2 hover:text-primary'>
        {t("privacyLink")}
      </Link>
      <Link href='/legal-notice' className='underline underline-offset-2 hover:text-primary'>
        {t("legalNoticeLink")}
      </Link>
    </span>
  );

  return (
    <>
      {showBanner ? (
        <div
          role='region'
          aria-label={t("bannerAriaLabel")}
          className='fixed inset-x-0 bottom-0 z-[100] px-3 pb-3 sm:px-5 sm:pb-5'
        >
          <div className='mx-auto max-w-[1100px] rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_20px_60px_rgba(10,27,40,0.25)] sm:p-6'>
            <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8'>
              <div className='min-w-0'>
                <h2 className='text-[17px] font-bold text-[#0A1B28] sm:text-[19px]'>
                  {t("title")}
                </h2>
                <p className='mt-2 text-[14px] leading-relaxed text-[#393E41]'>
                  {t("body")}
                </p>
                <div className='mt-3 text-[13px] text-[#5B6670]'>{legalLinks}</div>
              </div>

              <div className='flex shrink-0 flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row'>
                <button
                  type='button'
                  onClick={() => save(DENY_ALL)}
                  className='order-2 rounded-full border-2 border-[#304C61] px-6 py-3 text-[14px] font-bold text-[#304C61] transition hover:bg-[#304C61] hover:text-white sm:order-1 sm:min-w-[150px]'
                >
                  {t("rejectAll")}
                </button>
                <button
                  type='button'
                  onClick={() => save(ALLOW_ALL)}
                  className='order-1 rounded-full bg-primary px-6 py-3 text-[14px] font-bold text-white transition hover:bg-[#b8752f] sm:order-2 sm:min-w-[150px]'
                >
                  {t("acceptAll")}
                </button>
                <button
                  type='button'
                  onClick={openSettings}
                  className='order-3 rounded-full px-6 py-3 text-[14px] font-semibold text-[#304C61] underline underline-offset-2 transition hover:text-primary'
                >
                  {t("settings")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {settingsOpen ? (
        <div className='fixed inset-0 z-[110] flex items-end justify-center bg-[#0A1B28]/60 p-3 sm:items-center sm:p-6'>
          <div
            ref={dialogRef}
            role='dialog'
            aria-modal='true'
            aria-labelledby='cookie-settings-title'
            className='max-h-[85vh] w-full max-w-[620px] overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_24px_70px_rgba(10,27,40,0.35)] sm:p-8'
          >
            <h2 id='cookie-settings-title' className='text-[20px] font-bold text-[#0A1B28]'>
              {t("settingsTitle")}
            </h2>
            <p className='mt-2 text-[14px] leading-relaxed text-[#393E41]'>
              {t("settingsBody")}
            </p>

            <div className='mt-6 space-y-3'>
              <CategoryRow
                title={t("categories.necessary.title")}
                description={t("categories.necessary.description")}
                detail={t("categories.necessary.detail")}
                checked
                locked
                lockedLabel={t("alwaysOn")}
              />

              {OPTIONAL_CATEGORIES.map((category, index) => (
                <CategoryRow
                  key={category}
                  inputRef={index === 0 ? firstFieldRef : undefined}
                  title={t(`categories.${category}.title`)}
                  description={t(`categories.${category}.description`)}
                  detail={t(`categories.${category}.detail`)}
                  checked={draft[category]}
                  onChange={(value) =>
                    setDraft((current) => ({ ...current, [category]: value }))
                  }
                />
              ))}
            </div>

            <p className='mt-5 text-[13px] text-[#5B6670]'>
              {t("withdrawNote")} {legalLinks}
            </p>

            <div className='mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-end'>
              <button
                type='button'
                onClick={() => save(DENY_ALL)}
                className='rounded-full border-2 border-[#304C61] px-6 py-3 text-[14px] font-bold text-[#304C61] transition hover:bg-[#304C61] hover:text-white'
              >
                {t("rejectAll")}
              </button>
              <button
                type='button'
                onClick={() => save(draft)}
                className='rounded-full border-2 border-[#304C61] px-6 py-3 text-[14px] font-bold text-[#304C61] transition hover:bg-[#304C61] hover:text-white'
              >
                {t("saveSelection")}
              </button>
              <button
                type='button'
                onClick={() => save(ALLOW_ALL)}
                className='rounded-full bg-primary px-6 py-3 text-[14px] font-bold text-white transition hover:bg-[#b8752f]'
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function CategoryRow({
  title,
  description,
  detail,
  checked,
  onChange,
  locked = false,
  lockedLabel,
  inputRef,
}) {
  return (
    <div className='rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4'>
      <div className='flex items-start justify-between gap-4'>
        <div className='min-w-0'>
          <p className='text-[15px] font-bold text-[#0A1B28]'>{title}</p>
          <p className='mt-1 text-[13px] leading-relaxed text-[#393E41]'>{description}</p>
          <p className='mt-1.5 text-[12px] text-[#5B6670]'>{detail}</p>
        </div>

        {locked ? (
          <span className='shrink-0 rounded-full bg-[#304C61] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white'>
            {lockedLabel}
          </span>
        ) : (
          <label className='flex shrink-0 cursor-pointer items-center gap-2'>
            <input
              ref={inputRef}
              type='checkbox'
              checked={checked}
              onChange={(event) => onChange(event.target.checked)}
              className='h-5 w-5 accent-[#CC8640]'
            />
            <span className='sr-only'>{title}</span>
          </label>
        )}
      </div>
    </div>
  );
}
