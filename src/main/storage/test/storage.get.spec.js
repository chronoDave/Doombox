const test = require('tape');

const { THEME } = require('../../../config');

const { setup, cleanup } = require('./_utils');

test('[storage.get] should return all data if no key is provided', t => {
  const storage = setup();

  try {
    t.equal(
      Object.keys(storage.get()).length,
      Object.keys(THEME.dark).length,
      'returns all data'
    );
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});

test('[storage.get] should return data based on query', t => {
  const storage = setup();

  try {
    t.equal(
      storage.get('grey.1'),
      THEME.dark.grey[1],
      'returns query data'
    );
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});
