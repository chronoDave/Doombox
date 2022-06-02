const objectGet = require('lodash.get');
const { capitalize, pascalize } = require('@doombox-utils');

const translationEn = require('./translations/en.json');
const translationNl = require('./translations/nl.json');

const LANGUAGES = {
  en: 'English',
  nl: 'Nederlands'
} as const;

const TRANSLATIONS = {
  en: translationEn,
  nl: translationNl
} as const;

/**
 * Get translation string
 * @param {string} language - Language key
 * @param {string} key - Value key
 * @param {object} options
 * @param {boolean} options.plural - Is value plural?
 * @param {string} options.transform - String transform
 * @param {boolean} options.dots - Should dots be appended to the string?
 * @param {object} options.mixins - Mixins
 */
const getTranslation = (
  language: keyof typeof LANGUAGES,
  key: typeof TRANSLATIONS[keyof typeof LANGUAGES],
  options?: {
    plural?: boolean
    mixins: Record<string, unknown>,
    dots: boolean,
    transform: 'uppercase' | 'capitalize' | 'pascal'
  }
) => {
  let value = objectGet(TRANSLATIONS[language] || TRANSLATIONS.en, key);

  if (!value) return key;

  // Plural
  if (Array.isArray(value)) value = value[options?.plural ? 1 : 0];

  // Mixins
  const templates = value.match(/({.[^}]*.)/g);
  if (templates && templates.length > 0) {
    for (let i = 0; i < templates.length; i += 1) {
      value = value.replace(templates[i], options?.mixins[templates[i].slice(1, -1)]);
    }
  }

  // Dots
  if (options?.dots) value = `${value}...`;

  // Transform
  if (options?.transform === 'uppercase') return value.toUpperCase();
  if (options?.transform === 'capitalize') return capitalize(value);
  if (options?.transform === 'pascal') return pascalize(value);
  return value;
};

const getNativeKeybind = (keybind: string, transform?: 'capitalize' | 'pascal') => {
  const nativeKeybinds: Record<NodeJS.Platform, Record<string, string>> = {
    win32: {
      mod: 'ctrl'
    },
    darwin: {
      mod: '\u2318',
      shift: '\u21e7',
      option: '\u03b1',
      alt: '\u03b1'
    },
    linux: {
      mod: 'ctrl'
    },
    aix: {},
    android: {},
    freebsd: {},
    openbsd: {},
    sunos: {},
    cygwin: {},
    netbsd: {}
  };

  let nativeKeybind = keybind;
  Object
    .entries(nativeKeybinds[process.platform])
    .forEach(([key, value]) => {
      nativeKeybind = nativeKeybind.replace(key, value);
    });

  switch (transform) {
    case 'capitalize':
      return capitalize(nativeKeybind);
    case 'pascal':
      return pascalize(nativeKeybind, '+');
    default:
      return nativeKeybind;
  }
};

const localize = (
  metadata: Record<string, string>,
  tag: string,
  useLocalizedMetadata: boolean
) => (useLocalizedMetadata ?
  (metadata[`${tag}localized`] || metadata[tag] || '').toLowerCase() :
  (metadata[tag] || '').toLowerCase());

module.exports = {
  LANGUAGES,
  TRANSLATIONS,
  getTranslation,
  getNativeKeybind,
  localize
};
