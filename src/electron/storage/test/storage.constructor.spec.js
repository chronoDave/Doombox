const test = require('tape');

const THEME = require('../../../config/theme');

const { setup, cleanup } = require('./_utils');

test('[storage] should read config file', t => {
  const storage = setup();

  t.equal(storage.data.grey[50], THEME.grey[50], 'reads config file');
  t.equal(storage.data.dark, true, 'should override defaults');

  cleanup();

  t.end();
});
