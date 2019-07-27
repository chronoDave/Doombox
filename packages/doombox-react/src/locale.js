import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Languages
import uk from './locale/uk.json';
import us from './locale/us.json';
import nl from './locale/nl.json';

// Utils
import { isDev } from './utils';

const getLocale = () => {
  const locale = navigator.language;

  switch (locale) {
    case ('en-GB'): return 'uk';
    case ('en-US'): return 'us';
    default: return locale;
  }
};

i18n.use(initReactI18next).init({
  // Debug
  debug: isDev(),
  // General
  resources: { uk, us, nl },
  react: {
    useSuspense: false
  },
  // Langauge
  lng: getLocale(),
  fallbackLng: ['uk', 'us', 'nl'],
  // Namespace
  ns: ['common', 'title', 'validation'],
  defaultNS: 'common',
  // Interpolation
  interpolation: {
    escapeValue: false, // React escapes by default
  }
});

export default i18n;
