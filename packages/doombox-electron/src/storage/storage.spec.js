const test = require('ava');
const path = require('path');

const { CACHE, THEME } = require('@doombox/utils');
const fse = require('fs-extra');

const Storage = require('./storage');

const config = path.resolve(__dirname, 'config.json');

const setup = () => {
  fse.writeFileSync(config, JSON.stringify(THEME));

  return new Storage(__dirname, 'config', { variant: 'light' });
};

test.serial('should read config file', t => {
  const storage = setup();

  t.is(storage.data.grey.light, THEME.grey.light, 'reads config file');
  t.is(storage.data.variant, 'dark', 'should override defaults');

  fse.removeSync(config);
});

test.serial('should return all data if no key is provided', t => {
  const storage = setup();

  t.is(
    Object.keys(storage.get()).length,
    Object.keys(THEME).length,
    'returns all data'
  );

  fse.removeSync(config);
});

test.serial('should return data based on query', t => {
  const storage = setup();

  t.is(storage.get('grey.50'), THEME.grey[50], 'returns query data');

  fse.removeSync(config);
});

test.serial('should set storage data if no query is provided', t => {
  const storage = setup();

  storage.set(CACHE);

  t.is(
    Object.keys(storage.data).length,
    Object.keys(CACHE).length,
    'sets all data'
  );

  fse.removeSync(config);
});

test.serial('should set storage data based on query', t => {
  const storage = setup();

  storage.set(CACHE, 'ramp.50');

  t.is(
    Object.keys(storage.data.ramp[50]).length,
    Object.keys(CACHE).length,
    'sets data based on query'
  );

  fse.removeSync(config);
});
