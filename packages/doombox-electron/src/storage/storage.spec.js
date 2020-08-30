const test = require('tape');
const path = require('path');
const fse = require('fs-extra');
const {
  CACHE,
  THEME
} = require('@doombox/utils');

const Storage = require('./storage');

const config = path.resolve(__dirname, 'config.json');

test('should read config file', t => {
  fse.writeFileSync(config, JSON.stringify(THEME));

  const storage = new Storage(__dirname, 'config', { variant: 'light' });

  t.strictEqual(storage.data.grey.light, THEME.grey.light, 'reads config file');
  t.strictEqual(storage.data.variant, 'dark', 'should override defaults');

  fse.removeSync(config);

  t.end();
});

test('should return all data if no key is provided', t => {
  fse.writeFileSync(config, JSON.stringify(THEME));

  const storage = new Storage(__dirname, 'config', { variant: 'light' });

  t.strictEqual(
    Object.keys(storage.get()).length,
    Object.keys(THEME).length,
    'returns all data'
  );

  fse.removeSync(config);

  t.end();
});

test('should return data based on query', t => {
  fse.writeFileSync(config, JSON.stringify(THEME));

  const storage = new Storage(__dirname, 'config', { variant: 'light' });

  t.strictEqual(storage.get('ramp.50'), THEME.ramp[50], 'returns query data');

  fse.removeSync(config);

  t.end();
});

test('should set storage data if no query is provided', t => {
  fse.writeFileSync(config, JSON.stringify(THEME));

  const storage = new Storage(__dirname, 'config', { variant: 'light' });

  storage.set(CACHE);

  t.strictEqual(
    Object.keys(storage.data).length,
    Object.keys(CACHE).length,
    'sets all data'
  );

  fse.removeSync(config);

  t.end();
});

test('should set storage data based on query', t => {
  fse.writeFileSync(config, JSON.stringify(THEME));

  const storage = new Storage(__dirname, 'config', { variant: 'light' });

  storage.set(CACHE, 'ramp.50');

  t.strictEqual(
    Object.keys(storage.data.ramp[50]).length,
    Object.keys(CACHE).length,
    'sets data based on query'
  );

  fse.removeSync(config);

  t.end();
});
