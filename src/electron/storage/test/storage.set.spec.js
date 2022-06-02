const test = require('tape');
const { CACHE } = require('@doombox-config');

const { setup, cleanup } = require('./_utils');

test('[storage.set] should set storage data if no query is provided', t => {
  const storage = setup();

  try {
    storage.set(CACHE);

    t.equal(
      Object.keys(storage.data).length,
      Object.keys(CACHE).length,
      'sets all data'
    );
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});

test('[storage.set] should set storage data based on query', t => {
  const storage = setup();

  try {
    storage.set(CACHE, 'ramp.50');

    t.equal(
      Object.keys(storage.data.ramp[50]).length,
      Object.keys(CACHE).length,
      'sets data based on query'
    );
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});
