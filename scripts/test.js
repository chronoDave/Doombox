#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

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

const glob = require('fast-glob');

const files = glob.sync(process.argv[2], { absolute: true });
files.forEach(file => require(file));
