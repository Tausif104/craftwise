import { getPathname } from '@/i18n/navigation';

export function getLocalizedAlternates({ locale, href }) {
  return {
    canonical: getPathname({ locale, href }),
    languages: {
      de: getPathname({ locale: 'de', href }),
      en: getPathname({ locale: 'en', href }),
      'x-default': getPathname({ locale: 'de', href }),
    },
  };
}
