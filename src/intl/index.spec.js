const test = require('tape');

const { capitalize } = require('../utils');

const { LOCALES, LANGUAGES, getTranslation } = require('./index');

test('should return key if value does not exist', t => {
  const key = 'test_key';

  t.equal(getTranslation(LANGUAGES.EN, key), key);

  t.end();
});

test('should return translation if value exists', t => {
  const value = LOCALES[LANGUAGES.EN].common.album;
  const key = 'common.album';

  t.equal(getTranslation(LANGUAGES.EN, key), value);

  t.end();
});

test('should return plural if args contains plural', t => {
  const value = LOCALES[LANGUAGES.EN].common.album_plural;
  const key = 'common.album';

  t.equal(getTranslation(LANGUAGES.EN, key, { plural: true }), value);

  t.end();
});

test('should replace placeholder if args contains placeholder value', t => {
  const key = 'action.common.scan';
  const item = 'Test';

  t.equal(getTranslation(LANGUAGES.EN, key, { item }), `Scan ${item}`);

  t.end();
});

test('should capitalize if args contains "capitalize"', t => {
  const value = LOCALES[LANGUAGES.EN].common.album;
  const key = 'common.album';

  t.equal(
    getTranslation(LANGUAGES.EN, key, { transform: 'capitalize' }),
    capitalize(value)
  );

  t.end();
});

test('should PascalCase if args contains "pascal"', t => {
  const key = 'action.menu.scan_folder';

  t.equal(
    getTranslation(LANGUAGES.EN, key, { transform: 'pascal' }),
    LOCALES[LANGUAGES.EN].action.menu.scan_folder
      .split(' ')
      .map(capitalize)
      .join(' ')
  );

  t.end();
});

test('should lowercase if args contains "none"', t => {
  const key = 'action.menu.scan_folder';

  t.equal(
    getTranslation(LANGUAGES.EN, key, { transform: 'none' }),
    LOCALES[LANGUAGES.EN].action.menu.scan_folder.toLowerCase()
  );

  t.end();
});
