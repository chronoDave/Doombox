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
 */
const getTranslation = (
  language: keyof typeof LANGUAGES,
  key: typeof TRANSLATIONS[keyof typeof LANGUAGES]
) => objectGet(TRANSLATIONS[language] || TRANSLATIONS.en, key) ?? key;

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
    haiku: {},
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
