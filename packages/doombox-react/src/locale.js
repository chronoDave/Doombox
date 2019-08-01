import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Utils
import { isDev } from '@doombox/utils';

// Locales
import * as uk from './static/locales/en-GB.json';
import * as us from './static/locales/en-US.json';
import * as nl from './static/locales/nl.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: isDev(),
    resources: {
      'en-GB': uk,
      'en-US': us,
      nl
    },
    react: {
      useSuspense: false
    },
    fallbackLng: 'en-GB',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React escapes by default
    }
  });

export default i18n;
