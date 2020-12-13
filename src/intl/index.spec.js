const test = require('tape');

const { capitalize } = require('../utils');

const { LOCALES, LANGUAGES, getTranslation } = require('./index');

test('[getTranslation] should return key if value does not exist', t => {
  const key = 'test_key';

  t.equal(getTranslation(LANGUAGES.en, key), key);

  t.end();
});

test('[getTranslation] should return translation if value exists', t => {
  const value = LOCALES.en.common.album[0];
  const key = 'common.album';

  t.equal(getTranslation(LANGUAGES.en, key), value);

  t.end();
});

test('[getTranslation] should return plural if `plural` is true', t => {
  const value = LOCALES.en.common.album[1];
  const key = 'common.album';

  t.equal(getTranslation(LANGUAGES.en, key, { plural: true }), value);

  t.end();
});

test('[getTranslation] should replace placeholder if `options` contains `mixins`', t => {
  const key = 'action.common.scan';
  const item = 'Test';

  t.equal(getTranslation(LANGUAGES.en, key, { mixins: { item } }), `scan ${item}`);

  t.end();
});

test('[getTranslation] should return triple dots if `dots` is true', t => {
  const key = 'common.album';

  t.true(getTranslation(LANGUAGES.en, key, { dots: true }).includes('...'));

  t.end();
});

test('[getTranslation] should capitalize if `transform` contains `capitalize`', t => {
  const value = LOCALES.en.common.album[0];
  const key = 'common.album';

  t.equal(
    getTranslation(LANGUAGES.en, key, { transform: 'capitalize' }),
    capitalize(value)
  );

  t.end();
});

test('[getTranslation] should pascal case if `transform` contains `pascal`', t => {
  const key = 'action.menu.toggle_dev_tools';

  t.equal(
    getTranslation(LANGUAGES.en, key, { transform: 'pascal' }),
    LOCALES.en.action.menu.toggle_dev_tools
      .split(' ')
      .map(capitalize)
      .join(' ')
  );

  t.end();
});
