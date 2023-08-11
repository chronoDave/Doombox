const minimist = require('minimist');

const esbuild = require('./esbuild/esbuild');
const clean = require('./esbuild/plugins/clean');
const copy = require('./esbuild/plugins/copy');
const log = require('./esbuild/plugins/log');
const sass = require('./esbuild/plugins/sass');

const { w, dev } = minimist(process.argv.slice(2));

// Shared
const common = {
  bundle: true,
  minify: !dev,
  define: {
    'process.env.NODE_ENV': w ?
      '"development"' :
      '"production"',
    'process.env.DOM': dev ?
      '"development"' :
      '"production"'
  }
};

// App
esbuild({
  ...common,
  entryPoints: [
    { in: 'src/app/index.ts', out: 'app' },
    { in: 'src/app/preload.ts', out: 'preload' }
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
}, { watch: w });

// Renderer
esbuild({
  ...common,
  entryPoints: [
    'src/renderer/index.tsx',
    { in: 'src/renderer/index.scss', out: 'base' }
  ],
  outdir: 'build/app/renderer',
  outbase: 'src/renderer',
  metafile: true,
  plugins: [
    log('renderer'),
    clean(['build/renderer']),
    sass({
      style: dev ?
        'expanded' :
        'compressed',
      depedencies: [
        'src/renderer/scss/core'
      ],
      ignore: /\.otf$/
    }),
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
