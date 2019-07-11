import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Languages
import en from './locale/en.json';
import nl from './locale/nl.json';

// Utils
import { isDev } from './utils';

i18n.use(initReactI18next).init({
  // Debug
  debug: isDev(),
  // General
  resources: { en, nl },
  react: {
    useSuspense: false
  },
  // Langauge
  lng: 'en',
  fallbackLng: ['en', 'nl'],
  // Namespace
  ns: ['common', 'title', 'validation'],
  defaultNS: 'common',
  // Interpolation
  interpolation: {
    escapeValue: false, // React escapes by default
    format: (value, format) => {
      if (format === 'lowercase') return value.toLowerCase();
      if (format === 'uppercase') return value.toUpperCase();
      return value;
    }
  }
});

i18n.on('languageChanged', () => {
  return null;
});

export default i18n;
