const objectGet = require('lodash.get');

const { capitalize, pascalize } = require('@doombox-utils');

const translationEn = require('./translations/en.json');
const translationNl = require('./translations/nl.json');

const LANGUAGES = {
  en: 'English',
  nl: 'Nederlands'
};

const TRANSLATIONS = {
  en: translationEn,
  nl: translationNl
};

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
  language,
  key,
  {
    plural = false,
    mixins = {},
    dots = false,
    transform = null
  } = {}
) => {
  let value = objectGet(TRANSLATIONS[language] || TRANSLATIONS.en, key);

  if (!value) return key;

  // Plural
  if (Array.isArray(value)) value = value[plural ? 1 : 0];

  // Mixins
  const templates = value.match(/({.[^}]*.)/g);
  if (templates && templates.length > 0) {
    for (let i = 0; i < templates.length; i += 1) {
      value = value.replace(templates[i], mixins[templates[i].slice(1, -1)]);
    }
  }

  // Dots
  if (dots) value = `${value}...`;

  // Transform
  if (transform === 'capitalize') return capitalize(value);
  if (transform === 'pascal') return pascalize(value);
  return value;
};

const getNativeKeybind = (keybind, transform) => {
  const nativeKeybinds = {
    win32: {
      mod: 'ctrl'
    },
    darwin: {
      mod: '\u2318',
      shift: '\u21e7',
      option: '\u03b1',
      alt: '\u03b1'
    }
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

module.exports = {
  LANGUAGES,
  TRANSLATIONS,
  getTranslation,
  getNativeKeybind
};
