const test = require('tape');

const { THEME } = require('@doombox-config');

const { setup, cleanup } = require('./_utils');

test('[storage.get] should return all data if no key is provided', t => {
  const storage = setup();

  t.equal(
    Object.keys(storage.get()).length,
    Object.keys(THEME).length,
    'returns all data'
  );

  cleanup();

  t.end();
});

test('[storage.get] should return data based on query', t => {
  const storage = setup();

  t.equal(
    storage.get('grey.1'),
    THEME.grey[1],
    'returns query data'
  );

  cleanup();

  t.end();
});
