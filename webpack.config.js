const path = require('path');

const createConfigClient = require('./webpack.client');
const createConfigElectron = require('./webpack.electron');

const alias = {
  '@doombox-utils': path.resolve(__dirname, 'src/utils'),
  '@doombox-config': path.resolve(__dirname, 'src/config'),
  '@doombox-intl': path.resolve(__dirname, 'src/intl')
};

module.exports = (env, argv) => [
  createConfigElectron(({ alias, env })),
  createConfigClient({ alias, env, argv })
];
