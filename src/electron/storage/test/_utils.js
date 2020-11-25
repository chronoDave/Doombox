const fs = require('fs');
const path = require('path');

const THEME = require('../../../config/theme');

const configFile = path.resolve(__dirname, 'config.json');

const Storage = require('../storage');

const setup = () => {
  fs.writeFileSync(configFile, JSON.stringify(THEME));

  return new Storage(__dirname, 'config', { dark: false });
};

const cleanup = () => fs.unlinkSync(configFile);

module.exports = { setup, cleanup, configFile };
