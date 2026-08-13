"use client";

import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { applyGoogleTranslateLang } from "@/lib/googleTranslateController";
import { BlogContext } from "@/lib/BlogContext";
import { useConsent } from "@/components/global/consent-provider";

let GT_INITIALIZED = false;

export default function GoogleTranslate() {
  const { control } = useContext(BlogContext);

  // translate.google.com is a third-party service that sets its own cookies, so
  // it may not load before the visitor accepts the functional category.
  const { allows } = useConsent();
  const translationAllowed = allows("functional");

  useEffect(() => {
    if (!translationAllowed) return;
    if (GT_INITIALIZED) return;

    window.googleTranslateElementInit = () => {
      if (GT_INITIALIZED) return;
      GT_INITIALIZED = true;

      // 🔴 THIS IS THE "GoogleTranslate init"
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // must be your original language
          includedLanguages: "en,de", // only allowed langs
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Apply saved language AFTER init
      const saved = Cookies.get("userLang");
      if (saved && saved !== "en") {
        applyGoogleTranslateLang(saved);
      }
    };

    // load Google script ONCE
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [control, translationAllowed]);

  return (
    <div
      id='google_translate_element'
      style={{ display: "none" }} // hide default UI
    />
  );
}
