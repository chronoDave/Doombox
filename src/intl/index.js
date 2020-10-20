const { capitalize } = require('../utils');

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

const getTranslation = (language, id, args = {}) => {
  const path = id.split('.');

  if (args && args.plural) {
    path[path.length - 1] = `${path[path.length - 1]}_plural`;
  }

  let index = 0;
  let value = LOCALES[language];
  while (value && index < path.length) {
    value = value[path[index]];
    index += 1;
  }

  if (!value || !index || index !== path.length) return id;
  const matches = value.match(/({.[^}]*.)/g);

  if (matches) {
    if (typeof args === 'object') {
      for (let i = 0; i < matches.length; i += 1) {
        value = value.replace(matches[i], args[matches[i].slice(1, -1)]);
      }
    }
  }

  switch (args.transform) {
    case 'capitalize':
      return capitalize(value);
    case 'pascal':
      return value.split(' ').map(capitalize).join(' ');
    case 'none':
      return value.toLowerCase();
    default:
      if (path.includes('action')) return value.split(' ').map(capitalize).join(' ');
      if (path.includes('title') || path.includes('description')) return capitalize(value);
      return value;
  }
};

module.exports = {
  LANGUAGES,
  LOCALES,
  getTranslation
};
