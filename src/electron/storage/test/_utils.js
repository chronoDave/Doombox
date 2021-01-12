const fs = require('fs');
const path = require('path');

const { THEME } = require('@doombox-config');

const configFile = path.resolve(__dirname, 'config.json');

const Storage = require('../storage');

const setup = () => {
  fs.writeFileSync(configFile, JSON.stringify(THEME.dark));

  const storage = new Storage(__dirname, 'config', { dark: false });
  storage.data = storage.read();

  return storage;
};

const cleanup = () => fs.unlinkSync(configFile);

module.exports = { setup, cleanup, configFile };
