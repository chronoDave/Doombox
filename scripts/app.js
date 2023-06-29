const minimist = require('minimist');

const esbuild = require('./esbuild/esbuild');
const copy = require('./esbuild/plugins/copy');
const log = require('./esbuild/plugins/log');

const { w, dev } = minimist(process.argv.slice(2));

esbuild({
  entryPoints: [
    { in: 'src/app/index.ts', out: 'app' },
    { in: 'src/app/preload.ts', out: 'preload' }
  ],
  external: [
    'electron',
    'sharp',
    'fs-events'
  ],
  define: {
    'process.env.NODE_ENV': w ?
      '"development"' :
      '"production"',
    'process.env.DOM': dev ?
      '"development"' :
      '"production"'
  },
  platform: 'node',
  bundle: true,
  outdir: 'build/app',
  outbase: 'src/app',
  plugins: [
    log('app'),
    copy([{
      in: 'src/app/assets',
      out: 'build/app/assets'
    }])
  ]
}, { watch: w });
