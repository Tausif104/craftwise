"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useConsent } from "@/components/global/consent-provider";

/**
 * Loads GA4 / Google Tag Manager, but only once the visitor has agreed to the
 * statistics category. IDs come from the CMS (SEO & Tracking), so they are not
 * hard-coded in the site.
 *
 * The component stays mounted while consent is denied so it can also clean up
 * after a withdrawal: analytics cookies set during an earlier visit are removed
 * rather than left behind.
 */
export default function AnalyticsScripts({
  measurementId,
  gtmContainerId,
  consentRequired = true,
}) {
  const { allows } = useConsent();
  const allowed = consentRequired ? allows("statistics") : true;

  useEffect(() => {
    if (allowed) return;

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }

    clearAnalyticsCookies();
  }, [allowed]);

  if (!allowed || (!measurementId && !gtmContainerId)) return null;

  return (
    <>
      {measurementId ? (
        <>
          <Script
            id='ga4-src'
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy='afterInteractive'
          />
          <Script id='ga4-init' strategy='afterInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('consent', 'update', { analytics_storage: 'granted' });
              gtag('config', '${measurementId}');
            `}
          </Script>
        </>
      ) : null}

      {gtmContainerId ? (
        <Script id='gtm-init' strategy='afterInteractive'>
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmContainerId}');
          `}
        </Script>
      ) : null}
    </>
  );
}

/**
 * Google's analytics cookies are first-party, so withdrawing consent has to
 * remove them here. They are set on the registrable domain, which is why the
 * dot-prefixed variant is cleared too.
 */
function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter((name) => name && (name.startsWith("_ga") || name === "_gid" || name === "_gat"));

  const { hostname } = window.location;
  const domains = [undefined, hostname, `.${hostname}`, `.${hostname.split(".").slice(-2).join(".")}`];

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;${
        domain ? ` domain=${domain};` : ""
      }`;
    }
  }
}
