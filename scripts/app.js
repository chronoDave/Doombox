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
  keepNames: dev,
  define: {
    'process.env.NODE_ENV': w ?
      '"development"' :
      '"production"',
    'process.env.DOM': dev ?
      '"development"' :
      '"production"'
  }
};

return Promise.all([
  // App
  esbuild({
    ...common,
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
    sourcemap: !!w,
    outdir: 'build/app',
    outbase: 'src/app',
    plugins: [
      log('app'),
      copy([{
        in: 'src/app/assets',
        out: 'build/app/assets'
      }])
    ]
  }, { watch: w }),
  // Renderer
  esbuild({
    ...common,
    entryPoints: [
      'src/renderer/app/index.tsx',
      { in: 'src/renderer/app/index.scss', out: 'base' }
    ],
    outdir: 'build/app/renderer',
    outbase: 'src/renderer',
    sourcemap: !!w,
    metafile: true,
    plugins: [
      log('renderer'),
      clean(['build/renderer']),
      sass({
        style: dev ?
          'expanded' :
          'compressed',
        depedencies: [
          'src/renderer/app/scss/core'
        ],
        ignore: /\.ttf$/
      }),
      copy([{
        in: 'src/renderer/app/index.html',
        out: 'build/app/renderer/index.html'
      }, {
        in: 'src/renderer/app/assets/fonts',
        out: 'build/app/renderer/fonts'
      }, {
        in: 'src/renderer/app/assets/icons',
        out: 'build/app/renderer/icons'
      }])]
  }, { watch: w })
])
  .then(() => {
    if (!w) return process.exit();
    return null;
  });
