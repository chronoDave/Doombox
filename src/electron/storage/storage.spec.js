const test = require('tape');
const path = require('path');
const fs = require('fs');

const THEME = require('../../config/theme');
const CACHE = require('../../config/cache');

const Storage = require('./storage');

const config = path.resolve(__dirname, 'config.json');

const setup = () => {
  fs.writeFileSync(config, JSON.stringify(THEME));

  return new Storage(__dirname, 'config', { dark: false });
};

test('should read config file', t => {
  const storage = setup();

  t.equal(storage.data.grey[50], THEME.grey[50], 'reads config file');
  t.equal(storage.data.dark, true, 'should override defaults');

  fs.unlinkSync(config);

  t.end();
});

test('should return all data if no key is provided', t => {
  const storage = setup();

  t.equal(
    Object.keys(storage.get()).length,
    Object.keys(THEME).length,
    'returns all data'
  );

  fs.unlinkSync(config);

  t.end();
});

test('should return data based on query', t => {
  const storage = setup();

  t.equal(storage.get('grey.1'), THEME.grey[1], 'returns query data');

  fs.unlinkSync(config);

  t.end();
});

test('should set storage data if no query is provided', t => {
  const storage = setup();

  storage.set(CACHE);

  t.equal(
    Object.keys(storage.data).length,
    Object.keys(CACHE).length,
    'sets all data'
  );

  fs.unlinkSync(config);

  t.end();
});

test('should set storage data based on query', t => {
  const storage = setup();

  storage.set(CACHE, 'ramp.50');

  t.equal(
    Object.keys(storage.data.ramp[50]).length,
    Object.keys(CACHE).length,
    'sets data based on query'
  );

  fs.unlinkSync(config);

  t.end();
});
