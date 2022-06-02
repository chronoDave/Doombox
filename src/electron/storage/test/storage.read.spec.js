const test = require('tape');
const { THEME } = require('@doombox-config');

const { setup, cleanup } = require('./_utils');

test('[storage.read] should read config file', t => {
  const storage = setup();

  try {
    t.equal(
      storage.data.grey[1],
      THEME.dark.grey[1],
      'reads config file'
    );
    t.true(
      storage.data.dark,
      'overrides defaults'
    );
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});
