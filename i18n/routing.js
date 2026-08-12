import { defineRouting } from 'next-intl/routing';

export const pathnames = {
  '/': '/',
  '/about-us': { de: '/ueber-uns', en: '/about-us' },
  '/book-demo': { de: '/demo-buchen', en: '/book-demo' },
  '/comming-soon': { de: '/bald-verfuegbar', en: '/comming-soon' },
  '/consulting': { de: '/beratung', en: '/consulting' },
  '/contact': { de: '/kontakt', en: '/contact' },
  '/data-processing': { de: '/datenverarbeitung', en: '/data-processing' },
  '/faq': { de: '/faq', en: '/faq' },
  '/features': { de: '/funktionen', en: '/features' },
  '/features/collaboration': {
    de: '/funktionen/zusammenarbeit',
    en: '/features/collaboration',
  },
  '/features/planning-scheduling': {
    de: '/funktionen/planung-termine',
    en: '/features/planning-scheduling',
  },
  '/features/project-file': {
    de: '/funktionen/projektakte',
    en: '/features/project-file',
  },
  '/features/quoting-invoicing': {
    de: '/funktionen/angebote-rechnungen',
    en: '/features/quoting-invoicing',
  },
  '/features/time-tracking': {
    de: '/funktionen/zeiterfassung',
    en: '/features/time-tracking',
  },
  '/features/workflows-automation': {
    de: '/funktionen/workflows-automatisierung',
    en: '/features/workflows-automation',
  },
  '/industry': { de: '/gewerke', en: '/industry' },
  '/industry/carpenters': {
    de: '/gewerke/tischler-zimmerer',
    en: '/industry/carpenters',
  },
  '/industry/electricians': {
    de: '/gewerke/elektriker',
    en: '/industry/electricians',
  },
  '/industry/gardeners': {
    de: '/gewerke/galabau',
    en: '/industry/gardeners',
  },
  '/industry/painters': {
    de: '/gewerke/maler',
    en: '/industry/painters',
  },
  '/industry/plumbers': {
    de: '/gewerke/installateure-shk',
    en: '/industry/plumbers',
  },
  '/industry/roofers': {
    de: '/gewerke/dachdecker',
    en: '/industry/roofers',
  },
  '/landing-page': { de: '/Jetzt-Loslegen', en: '/landing-page' },
  '/legal-notice': { de: '/impressum', en: '/legal-notice' },
  '/news': { de: '/news', en: '/news' },
  '/news/[id]': { de: '/news/[id]', en: '/news/[id]' },
  '/pricing': { de: '/preise', en: '/pricing' },
  '/privacy-policy': { de: '/datenschutz', en: '/privacy-policy' },
  '/registration': { de: '/registration', en: '/registration' },
  '/registration/confirm': {
    de: '/registration/confirm',
    en: '/registration/confirm',
  },
  '/terms-conditions': { de: '/agb', en: '/terms-conditions' },
  '/underconstruction': { de: '/in-arbeit', en: '/underconstruction' },
};

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',
  pathnames,
});
