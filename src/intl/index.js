const objectGet = require('lodash.get');

const { capitalize } = require('@doombox-utils');

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

const DARWIN_KEYBINDS = {
  mod: '\u2318',
  shift: '\u21e7',
  option: '\u03b1',
  alt: '\u03b1'
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
      return value
        .split(' ')
        .map(capitalize)
        .join(' ');
    default:
      return value;
  }
};

const getNativeKeybind = keybind => {
  if (process.platform !== 'darwin') return keybind;

  let newValue = keybind;
  Object
    .entries(DARWIN_KEYBINDS)
    .forEach(([key, value]) => {
      newValue = keybind.replace(key, value);
    });

  return newValue;
};

module.exports = {
  LANGUAGES,
  LOCALES,
  getTranslation,
  getNativeKeybind
};
