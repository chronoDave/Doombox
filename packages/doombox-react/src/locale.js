import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Languages
import uk from './locale/uk.json';
import us from './locale/us.json';
import nl from './locale/nl.json';

// Utils
import { isDev } from './utils';

i18n.use(initReactI18next).init({
  // Debug
  debug: isDev(),
  // General
  resources: { uk, us, nl },
  react: {
    useSuspense: false
  },
  // Langauge
  lng: 'uk',
  fallbackLng: ['uk', 'us', 'nl'],
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

export default i18n;
