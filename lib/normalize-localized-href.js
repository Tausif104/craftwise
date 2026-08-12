const LOCALE_PREFIX_RE = /^\/(en|de)(?=\/|$)/;

export function normalizeLocalizedHref(href) {
  if (typeof href !== 'string') return href;
  if (href.startsWith('#')) return href;

  const normalized = href.replace(LOCALE_PREFIX_RE, '');
  return normalized || '/';
}
