#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const walk = require('@chronocide/fs-walk').default;

require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [
    ['module-resolver', {
      root: ['../src'],
      alias: {
        '@doombox-utils': './src/utils',
        '@doombox-config': './src/config',
        '@doombox-intl': './src/intl/intl'
      }
    }]
  ]
});
require('@babel/polyfill');

walk(process.argv[2])
  .filter(file => /\.spec\.js$/.test(file))
  .forEach(file => require(file));
