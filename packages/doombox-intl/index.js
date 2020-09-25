const localeEn = require('./locale/en.json');
const localeNl = require('./locale/nl.json');

const LANGUAGES = {
  EN: 'en',
  NL: 'nl'
};

const LOCALES = {
  [LANGUAGES.EN]: localeEn,
  [LANGUAGES.NL]: localeNl
};

const getTranslation = (language, id) => {
  const path = id.split('.');

  let index = 0;
  let value = LOCALES[language];
  while (value && index < path.length) {
    value = value[path[index]];
    index += 1;
  }

  if (!value || !index || index !== path.length) return id;
  return value;
};

module.exports = {
  LANGUAGES,
  LOCALES,
  getTranslation
};
