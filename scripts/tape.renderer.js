const esbuild = require('esbuild');
const glob = require('fast-glob');
const path = require('path');

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
    'process.env.NODE_ENV': '"development"'
  },
  legalComments: 'none',
  platform: 'browser',
  outdir: path.resolve(__dirname, '../build/test'),
  outbase: 'src'
});
