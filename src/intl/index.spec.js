const test = require('tape');

const { capitalize } = require('../utils');

const { LOCALES, LANGUAGES, getTranslation } = require('./index');

test('[getTranslation] should return key if value does not exist', t => {
  const key = 'test_key';

  t.equal(getTranslation(LANGUAGES.EN, key), key);

  t.end();
});

test('[getTranslation] should return translation if value exists', t => {
  const value = LOCALES[LANGUAGES.EN].common.album;
  const key = 'common.album';

  t.equal(getTranslation(LANGUAGES.EN, key), value);

  t.end();
});

test('[getTranslation] should return plural if `options` contains `plural`', t => {
  const value = LOCALES[LANGUAGES.EN].common.album_plural;
  const key = 'common.album';

  t.equal(getTranslation(LANGUAGES.EN, key, { plural: true }), value);

  t.end();
});

test('[getTranslation] should replace placeholder if `options` contains `mixins`', t => {
  const key = 'action.common.scan';
  const item = 'Test';

  t.equal(getTranslation(LANGUAGES.EN, key, { mixins: { item } }), `scan ${item}`);

  t.end();
});

test('[getTranslation] should capitalize if `transform` contains `capitalize`', t => {
  const value = LOCALES[LANGUAGES.EN].common.album;
  const key = 'common.album';

  t.equal(
    getTranslation(LANGUAGES.EN, key, { transform: 'capitalize' }),
    capitalize(value)
  );

  t.end();
});

test('[getTranslation] should pascal case if `transform` contains `pascal`', t => {
  const key = 'action.menu.toggle_dev_tools';

  t.equal(
    getTranslation(LANGUAGES.EN, key, { transform: 'pascal' }),
    LOCALES[LANGUAGES.EN].action.menu.toggle_dev_tools
      .split(' ')
      .map(capitalize)
      .join(' ')
  );

  t.end();
});
