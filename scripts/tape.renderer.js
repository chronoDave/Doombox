const esbuild = require('esbuild');
const glob = require('fast-glob');
const fs = require('fs');
const path = require('path');

const outdir = path.resolve(__dirname, '../build/test');
esbuild.build({
  entryPoints: glob.sync('../src/renderer/**/*.spec.{ts,tsx}', {
    cwd: __dirname,
    absolute: true
  }),
  bundle: true,
  external: [
    'tape',
    'jsdom'
  ],
  plugins: [{
    name: 'clean',
    setup: build => {
      build.onStart(() => {
        fs.rmSync(path.resolve(outdir, 'renderer'), { recursive: true, force: true });
      });
    }
  }, {
    name: 'ignore',
    setup: build => {
      build.onResolve({ filter: /.scss$/ }, args => ({
        path: args.path,
        namespace: 'ignored'
      }));
      build.onLoad({ filter: /.*/, namespace: 'ignored' }, () => ({ contents: '' }));
    }
  }],
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
