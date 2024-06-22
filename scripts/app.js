const fs = require('fs');
const path = require('path');

const esbuild = require('./esbuild/esbuild');
const copy = require('./esbuild/plugins/copy');
const log = require('./esbuild/plugins/log');
const sass = require('./esbuild/plugins/sass');

const args = process.argv.slice(2);
const dev = args.includes('--dev');
const watch = args.includes('-w');

const common = {
  bundle: true,
  minify: !dev,
  keepNames: dev,
  sourcemap: !!watch,
  define: {
    'process.env.NODE_ENV': watch ?
      '"development"' :
      '"production"',
    'process.env.DOM': dev ?
      '"development"' :
      '"production"'
  }
};

esbuild({
  ...common,
  entryPoints: [
    { in: 'src/app/index.ts', out: 'app' },
    ...fs.readdirSync(path.resolve(__dirname, '../src/app/windows')).map(window => ({
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
}, {
  ...common,
  entryPoints: [
    { in: 'src/renderer/scss/index.scss', out: 'core' },
    ...fs.readdirSync(path.resolve(__dirname, '../src/renderer/windows'))
      .map(window => `src/renderer/windows/${window}/index.tsx`)
  ],
  outdir: 'build/app/renderer',
  outbase: 'src/renderer/windows',
  metafile: true,
  plugins: [
    log('renderer'),
    sass({
      depedencies: ['src/renderer/scss/core'],
      ignore: /\.ttf$/
    }),
    copy([{
      in: 'src/renderer/assets/fonts',
      out: 'build/app/renderer/fonts'
    }, {
      in: 'src/renderer/assets/icons',
      out: 'build/app/renderer/icons'
    },
    ...fs.readdirSync(path.resolve(__dirname, '../src/renderer/windows'))
      .map(window => ({
        in: `src/renderer/windows/${window}/index.html`,
        out: `build/app/renderer/${window}/index.html`
      }))])
  ]
});
