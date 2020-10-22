#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { walk } = require('../src/utils');

require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [
    ['module-resolver', {
      root: ['../src'],
      alias: {
        '@doombox-utils': './src/utils',
        '@doombox-config': './src/config',
        '@doombox-intl': './src/intl'
      }
    }]
  ]
});
require('@babel/polyfill');

const files = walk(process.argv[2], process.argv[3]);
files.forEach(file => require(file));
