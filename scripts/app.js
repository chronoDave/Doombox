const minimist = require('minimist');

const esbuild = require('./esbuild/esbuild');
const clean = require('./esbuild/plugins/clean');
const copy = require('./esbuild/plugins/copy');
const log = require('./esbuild/plugins/log');
const sass = require('./sass/sass');

const { w, dev } = minimist(process.argv.slice(2));

// App
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

// Renderer
esbuild({
  entryPoints: ['src/renderer/index.tsx'],
  define: {
    'process.env.NODE_ENV': w ?
      '"development"' :
      '"production"',
    'process.env.DOM': dev ?
      '"development"' :
      '"production"'
  },
  bundle: true,
  outdir: 'build/app/renderer',
  outbase: 'src/renderer',
  plugins: [
    log('renderer'),
    clean(['build/renderer']),
    copy([{
      in: 'src/renderer/index.html',
      out: 'build/app/renderer/index.html'
    }, {
      in: 'src/renderer/assets/fonts',
      out: 'build/app/renderer/fonts'
    }, {
      in: 'src/renderer/assets/icons',
      out: 'build/app/renderer/icons'
    }])]
}, { watch: w });

sass([{
  in: 'src/renderer/index.scss',
  out: 'build/app/renderer',
  depedencies: [
    'src/renderer/scss',
    'src/renderer/modules',
    'src/renderer/views'
  ]
}]);
