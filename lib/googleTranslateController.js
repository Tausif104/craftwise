// /lib/googleTranslateController.js
import Cookies from "js-cookie";

function getRootDomain(hostname) {
  // handles: www.example.com -> .example.com
  // for localhost / IP it returns null
  const parts = hostname.split(".");
  if (parts.length < 2) return null;
  return `.${parts.slice(-2).join(".")}`;
}

function setGoogTransCookie(lang) {
  Cookies.set("userLang", lang, { expires: 7, path: "/" });
console.log("lang", lang);

  // IMPORTANT: persist googtrans too
  Cookies.set("googtrans", `/en/${lang}`, { expires: 7, path: "/" });

  // OPTIONAL but helps when you have subdomains
  const root = getRootDomain(window.location.hostname);
  if (root) {
    Cookies.set("googtrans", `/en/${lang}`, {
      expires: 7,
      path: "/",
      domain: root,
    });
    Cookies.set("userLang", lang, { expires: 7, path: "/", domain: root });
  }
}

export function applyGoogleTranslateLang(lang = "en") {
  setGoogTransCookie(lang);

  const tryApply = () => {
    const combo = document.querySelector(".goog-te-combo");
    if (!combo) return false;

    const hasOption = Array.from(combo.options).some((o) => o.value === lang);
    if (!hasOption) return false;

    // ✅ ALWAYS dispatch (do NOT early-return)
    combo.value = lang;
    combo.dispatchEvent(new Event("change", { bubbles: true }));

    // ✅ Extra revert punch for EN (Google Translate is flaky here)
    if (lang === "en") {
      setTimeout(() => {
        combo.value = "en";
        combo.dispatchEvent(new Event("change", { bubbles: true }));
      }, 50);
    }

    return true;
  };

  if (tryApply()) return;

  let attempts = 0;
  const t = setInterval(() => {
    attempts += 1;
    if (tryApply() || attempts > 80) clearInterval(t);
  }, 150);
}
