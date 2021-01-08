const test = require('tape');

const { capitalize } = require('../utils');

const { TRANSLATIONS, LANGUAGES, getTranslation } = require('./intl');

test('[getTranslation] should return key if value does not exist', t => {
  const key = 'test_key';

  t.equal(
    getTranslation(LANGUAGES.en, key),
    key,
    'returns key'
  );

  t.end();
});

test('[getTranslation] should return translation if value exists', t => {
  const value = TRANSLATIONS.en.common.album[0];
  const key = 'common.album';

  t.equal(
    getTranslation(LANGUAGES.en, key),
    value,
    'returns translation'
  );

  t.end();
});

test('[getTranslation] should return plural if `plural` is true', t => {
  const value = TRANSLATIONS.en.common.album[1];
  const key = 'common.album';

  t.equal(
    getTranslation(LANGUAGES.en, key, { plural: true }),
    value,
    'returns plural'
  );

  t.end();
});

test('[getTranslation] should replace placeholder if `options` contains `mixins`', t => {
  const key = 'action.common.scan';
  const item = 'Test';

  t.equal(
    getTranslation(LANGUAGES.en, key, { mixins: { item } }),
    `scan ${item}`,
    'replaces placeholder'
  );

  t.end();
});

test('[getTranslation] should return triple dots if `dots` is true', t => {
  const key = 'common.album';

  t.true(
    getTranslation(LANGUAGES.en, key, { dots: true }).includes('...'),
    'adds triple dots'
  );

  t.end();
});

test('[getTranslation] should capitalize if `transform` contains `uppercase`', t => {
  const value = TRANSLATIONS.en.common.album[0];
  const key = 'common.album';

  t.equal(
    getTranslation(LANGUAGES.en, key, { transform: 'uppercase' }),
    value.toUpperCase(),
    'capitalizes string'
  );

  t.end();
});

test('[getTranslation] should capitalize if `transform` contains `capitalize`', t => {
  const value = TRANSLATIONS.en.common.album[0];
  const key = 'common.album';

  t.equal(
    getTranslation(LANGUAGES.en, key, { transform: 'capitalize' }),
    capitalize(value),
    'capitalizes string'
  );

  t.end();
});

test('[getTranslation] should pascal case if `transform` contains `pascal`', t => {
  const key = 'action.menu.toggle_dev_tools';

  t.equal(
    getTranslation(LANGUAGES.en, key, { transform: 'pascal' }),
    TRANSLATIONS.en.action.menu.toggle_dev_tools
      .split(' ')
      .map(capitalize)
      .join(' '),
    'pascalizes string'
  );

  t.end();
});
