const glob = require('fast-glob');
const path = require('path');

const esbuild = require('./esbuild/esbuild');
const clean = require('./esbuild/plugins/clean');
const log = require('./esbuild/plugins/log');

const outdir = path.resolve(__dirname, '../build/test');

esbuild({
  entryPoints: [
    ...glob.sync('../src/app/**/*.spec.{ts,tsx}', {
      cwd: __dirname,
      absolute: true
    }),
    ...glob.sync('../src/utils/**/*.spec.{ts,tsx}', {
      cwd: __dirname,
      absolute: true
    })
  ],
  bundle: true,
  external: [
    'tape',
    'electron',
    'sharp',
    'kuromoji'
  ],
  define: {
    'process.env.NODE_ENV': '"development"',
    'process.env.DOM': '"development"'
  },
  legalComments: 'none',
  platform: 'node',
  outdir,
  outbase: 'src',
  plugins: [
    log('tape.app'),
    clean([
      path.resolve(outdir, 'app'),
      path.resolve(outdir, 'utils')
    ])
  ]
});

esbuild({
  entryPoints: glob.sync('../src/renderer/**/*.spec.{ts,tsx}', {
    cwd: __dirname,
    absolute: true
  }),
  bundle: true,
  external: [
    'tape',
    'jsdom'
  ],
  plugins: [
    log('tape.renderer'),
    clean([path.resolve(outdir, 'renderer')])
  ],
  inject: [
    path.resolve(__dirname, '../test/shims/dom.js')
  ],
  define: {
    'process.env.NODE_ENV': '"development"',
    'process.env.DOM': '"development"'
  },
  legalComments: 'none',
  platform: 'browser',
  outdir,
  outbase: 'src'
});
