const fs = require('fs');
const path = require('path');

const configFile = path.resolve(__dirname, 'config.json');

const { THEME } = require('../../../config');

require('esbuild').buildSync({
  entryPoints: [path.resolve(__dirname, '../storage.js')],
  bundle: true,
  platform: 'node',
  outfile: path.resolve(__dirname, 'build.js')
});

const Storage = require('./build');

const setup = () => {
  fs.writeFileSync(configFile, JSON.stringify(THEME.dark));

  const storage = new Storage(__dirname, 'config', { dark: false });
  storage.data = storage.read();

  return storage;
};

const cleanup = () => fs.unlinkSync(configFile);

module.exports = { setup, cleanup, configFile };
