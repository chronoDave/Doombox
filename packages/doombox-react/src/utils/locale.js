import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Locales
import us from '../static/locales/en-US.json';

i18n
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_END === 'development',
    resources: {
      'en-US': us
    },
    react: {
      useSuspense: false
    },
    lng: 'en-US',
    fallbackLng: 'en-US',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false // React escapes by default
    }
  });

export default i18n;
