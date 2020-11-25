const objectGet = require('lodash.get');

const { capitalize, pascalize } = require('@doombox-utils');

const localeEn = require('./locales/en.json');
const localeNl = require('./locales/nl.json');

const LANGUAGES = {
  EN: 'en',
  NL: 'nl'
};

const LOCALES = {
  [LANGUAGES.EN]: localeEn,
  [LANGUAGES.NL]: localeNl
};

/**
 * Get translation string
 * @param {string} language - Language key
 * @param {string} key - Value key
 * @param {object} options
 * @param {boolean} options.plural - Is value plural?
 * @param {string} options.transform - String transform
 * @param {object} options.mixins - Mixins
 */
const getTranslation = (
  language,
  key,
  {
    plural = false,
    transform = null,
    mixins = {}
  } = {}
) => {
  const values = LOCALES[language];
  let value = objectGet(values, plural ? `${key}_plural` : key);

  if (!value) return key;

  // Mixins
  const templates = value.match(/({.[^}]*.)/g); // String templates
  if (templates && templates.length > 0) {
    for (let i = 0; i < templates.length; i += 1) {
      value = value.replace(templates[i], mixins[templates[i].slice(1, -1)]);
    }
  }

  // Transform
  switch (transform) {
    case 'capitalize':
      return capitalize(value);
    case 'pascal':
      return pascalize(value, ' ');
    default:
      return value;
  }
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
  LOCALES,
  getTranslation,
  getNativeKeybind
};
