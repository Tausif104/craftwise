"use client";

import { useState } from "react";

/**
 * Shared submit handler for the public lead forms (C2).
 *
 * The contact, consulting and book-a-demo forms previously had no handler at
 * all, so every submission was silently discarded. This posts to /api/leads,
 * carries UTM parameters through from the current URL, and reports status back
 * to the form in the visitor's language.
 */

const COPY = {
  de: {
    sending: "Wird gesendet…",
    success: "Danke! Wir melden uns in Kürze bei Ihnen.",
    error: "Das hat nicht geklappt. Bitte versuchen Sie es erneut.",
    consent: "Bitte stimmen Sie der Datenschutzerklärung zu.",
    email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  },
  en: {
    sending: "Sending…",
    success: "Thanks! We'll be in touch shortly.",
    error: "That didn't go through. Please try again.",
    consent: "Please accept the privacy policy.",
    email: "Enter a valid email address.",
  },
};

function currentUtm() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm = {};

  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }

  return utm;
}

export function useLeadForm({ type, locale = "de", requireConsent = true }) {
  const [state, setState] = useState({ status: "idle", message: "" });
  const copy = COPY[locale] || COPY.de;

  const submit = async (event, extraFields = {}) => {
    event.preventDefault();

    const formEl = event.currentTarget;
    const data = new FormData(formEl);

    const email = String(data.get("email") || "").trim();
    const consent = requireConsent ? data.get("consent") === "on" : true;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ status: "error", message: copy.email });
      return;
    }

    if (!consent) {
      setState({ status: "error", message: copy.consent });
      return;
    }

    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const name =
      String(data.get("name") || "").trim() || [firstName, lastName].filter(Boolean).join(" ");

    setState({ status: "sending", message: copy.sending });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          locale,
          name,
          email,
          phone: data.get("phone") || null,
          company: data.get("company") || null,
          message: data.get("message") || null,
          consentGiven: consent,
          landingPage:
            typeof window !== "undefined" ? window.location.pathname : null,
          utm: currentUtm(),
          extra: { ...Object.fromEntries(data.entries()), ...extraFields },
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        setState({ status: "error", message: result.msg || copy.error });
        return;
      }

      formEl.reset();
      setState({ status: "success", message: copy.success });
    } catch {
      setState({ status: "error", message: copy.error });
    }
  };

  return { ...state, submit, isSending: state.status === "sending" };
}
