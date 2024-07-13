const glob = require('fast-glob');
const path = require('path');

const esbuild = require('./esbuild/esbuild');
const clean = require('./esbuild/plugins/clean');
const ignore = require('./esbuild/plugins/ignore');
const log = require('./esbuild/plugins/log');

const outdir = path.resolve(__dirname, '../build/test');

const common = {
  outbase: 'src',
  bundle: true,
  outdir,
  sourcemap: true,
  legalComments: 'none',
  define: {
    'process.env.NODE_ENV': '"development"',
    'process.env.DOM': '"development"'
  }
};

esbuild({
  ...common,
  entryPoints: [
    ...glob.sync('../src/app/**/*.spec.{ts,tsx}', {
      cwd: __dirname,
      absolute: true
    }),
    ...glob.sync('../src/lib/**/*.spec.{ts,tsx}', {
      cwd: __dirname,
      absolute: true
    })
  ],
  external: [
    'tape',
    'electron',
    'sharp',
    'kuromoji'
  ],
  platform: 'node',
  plugins: [
    log('tape.app'),
    clean([
      path.resolve(outdir, 'app'),
      path.resolve(outdir, 'utils')
    ])
  ]
}, {
  ...common,
  entryPoints: glob.sync('../src/renderer/**/*.spec.{ts,tsx}', {
    cwd: __dirname,
    absolute: true
  }),
  external: [
    'tape',
    'jsdom'
  ],
  plugins: [
    log('tape.renderer'),
    ignore([/.scss$/]),
    clean([path.resolve(outdir, 'renderer')])
  ],
  inject: [
    path.resolve(__dirname, '../test/shims/dom.js')
  ],
  platform: 'browser'
});
