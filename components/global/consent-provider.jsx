"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  CONSENT_COOKIE,
  CONSENT_EVENT,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_OPEN_EVENT,
  DENY_ALL,
  parseConsent,
  serialiseConsent,
} from "@/lib/consent";

const ConsentContext = createContext(null);

/**
 * Holds the visitor's cookie decision for the whole page.
 *
 * The initial value comes from the server so the first paint already knows
 * whether to show the banner and whether tracking may load — no flash, and no
 * script that runs before consent exists.
 */
export default function ConsentProvider({ initialConsent = null, children }) {
  const [consent, setConsent] = useState(initialConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // A page served from the router cache can carry a stale server value, so the
  // cookie is re-read once on mount.
  useEffect(() => {
    const stored = parseConsent(Cookies.get(CONSENT_COOKIE));
    if (JSON.stringify(stored) !== JSON.stringify(consent)) setConsent(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = useCallback((choice) => {
    const decidedAt = new Date().toISOString();
    const next = {
      necessary: true,
      functional: Boolean(choice?.functional),
      statistics: Boolean(choice?.statistics),
      decidedAt,
    };

    Cookies.set(CONSENT_COOKIE, serialiseConsent(next, decidedAt), {
      expires: CONSENT_MAX_AGE_DAYS,
      sameSite: "lax",
      secure: typeof window !== "undefined" && window.location.protocol === "https:",
      path: "/",
    });

    setConsent(next);
    setSettingsOpen(false);

    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
  }, []);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  // Lets anything on the page (the footer link, a link inside the privacy
  // policy) re-open the dialog without being wired to this context.
  useEffect(() => {
    const handler = () => setSettingsOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, handler);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handler);
  }, []);

  const value = useMemo(
    () => ({
      consent: consent || DENY_ALL,
      hasDecision: Boolean(consent),
      allows: (category) => (category === "necessary" ? true : Boolean(consent?.[category])),
      save,
      settingsOpen,
      openSettings,
      closeSettings,
    }),
    [consent, save, settingsOpen, openSettings, closeSettings],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

/**
 * Safe outside the provider (admin screens, error pages): reports "no consent",
 * which keeps optional scripts switched off rather than crashing.
 */
export function useConsent() {
  return (
    useContext(ConsentContext) || {
      consent: DENY_ALL,
      hasDecision: false,
      allows: () => false,
      save: () => {},
      settingsOpen: false,
      openSettings: () => {},
      closeSettings: () => {},
    }
  );
}
