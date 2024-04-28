const fs = require('fs');
const path = require('path');

const copy = require('../plugins/copy');
const log = require('../plugins/log');

const common = require('./common');

const windows = fs.readdirSync(path.resolve(__dirname, '../../../src/app/windows'));

module.exports = options => ({
  ...common(options),
  entryPoints: [
    { in: 'src/app/index.ts', out: 'app' },
    ...windows.map(window => ({
      in: `src/app/windows/${window}/preload.ts`,
      out: `preload/${window}`
    }))
  ],
  external: [
    'electron',
    'sharp',
    'fs-events'
  ],
  platform: 'node',
  outdir: 'build/app',
  outbase: 'src/app',
  plugins: [
    log('app'),
    copy([{
      in: 'src/app/assets',
      out: 'build/app/assets'
    }])
  ]
});
