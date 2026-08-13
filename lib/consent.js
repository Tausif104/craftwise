/**
 * Cookie consent (TTDSG §25 / DSGVO Art. 6).
 *
 * Nothing beyond strictly necessary cookies may be set before the visitor
 * agrees, so the decision has to be readable on the server (to avoid a banner
 * flash and to keep tracking out of the first render) and on the client (to
 * react the moment the visitor changes their mind). Both sides share this file.
 *
 * The stored value is deliberately small and readable — a supervisory authority
 * asking "what did this user agree to and when" gets a straight answer.
 */

export const CONSENT_COOKIE = "craftwise_consent";

/**
 * Bump when the categories or the services inside them change: an older
 * decision no longer covers the new processing, so we have to ask again.
 */
export const CONSENT_VERSION = 1;

/** Consent expires so visitors are re-asked, per DSK guidance. */
export const CONSENT_MAX_AGE_DAYS = 182;

/** Fired on `window` whenever the decision changes, so scripts can react. */
export const CONSENT_EVENT = "craftwise:consent-change";

/** Fired on `window` to re-open the settings dialog (footer link). */
export const CONSENT_OPEN_EVENT = "craftwise:consent-open";

/**
 * `necessary` is not a choice — session, login and consent cookies themselves.
 * Everything else defaults to off; nothing may be pre-ticked.
 */
export const CONSENT_CATEGORIES = ["necessary", "functional", "statistics"];

export const DENY_ALL = { necessary: true, functional: false, statistics: false };
export const ALLOW_ALL = { necessary: true, functional: true, statistics: true };

/**
 * Reads a stored decision. Returns null when there is none, when it is
 * unreadable, or when it predates the current version — all three mean "ask".
 */
export function parseConsent(rawValue) {
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue));

    if (!parsed || parsed.v !== CONSENT_VERSION) return null;

    return {
      necessary: true,
      functional: Boolean(parsed.functional),
      statistics: Boolean(parsed.statistics),
      decidedAt: parsed.ts || null,
    };
  } catch {
    return null;
  }
}

export function serialiseConsent(consent, decidedAt = new Date().toISOString()) {
  return encodeURIComponent(
    JSON.stringify({
      v: CONSENT_VERSION,
      ts: decidedAt,
      functional: Boolean(consent?.functional),
      statistics: Boolean(consent?.statistics),
    }),
  );
}

/** Server-side read. Takes the cookie store PageLayout already awaited. */
export function readConsentFromCookies(cookieStore) {
  return parseConsent(cookieStore?.get(CONSENT_COOKIE)?.value);
}
