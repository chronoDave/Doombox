const copy = require('../plugins/copy');
const log = require('../plugins/log');

const common = require('./common');

module.exports = options => ({
  ...common(options),
  entryPoints: [
    { in: 'src/app/index.ts', out: 'app' },
    { in: 'src/app/windows/home/preload.ts', out: 'preload/index' }
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
