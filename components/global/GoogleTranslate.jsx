"use client";

import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { applyGoogleTranslateLang } from "@/lib/googleTranslateController";
import { BlogContext } from "@/lib/BlogContext";

let GT_INITIALIZED = false;

export default function GoogleTranslate() {
  const { control } = useContext(BlogContext);
  useEffect(() => {
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
  }, [control]);
  console.log(control, "s");

  return (
    <div
      id='google_translate_element'
      style={{ display: "none" }} // hide default UI
    />
  );
}
