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
  // Resources
  resources: { en, nl },
  // Langauge
  lng: 'nl',
  fallbackLng: 'en',
  // Namespace
  ns: ['common', 'title', 'validation'],
  defaultNS: 'common',
  // Interpolation
  interpolation: {
    escapeValue: false // React escapes by default
  }
});

export default i18n;
