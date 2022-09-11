const { build } = require('esbuild');
const path = require('path');
const fs = require('fs');
const glob = require('fast-glob');

const outdir = path.resolve(__dirname, 'build');

fs.rmSync(outdir, { force: true, recursive: true });
build({
  entryPoints: glob.sync('src/**/*.spec.{ts,tsx}', { cwd: __dirname, absolute: true }),
  bundle: true,
  external: [
    'tape',
    'electron',
    'jsdom'
  ],
  plugins: [{
    name: 'ignore',
    setup: x => {
      x.onResolve({ filter: /.scss$/ }, args => ({
        path: args.path,
        namespace: 'ignored'
      }));
      x.onLoad({ filter: /.*/, namespace: 'ignored' }, () => ({ contents: '' }));
    }
  }],
  inject: [
    path.resolve(__dirname, 'shim.js')
  ],
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  legalComments: 'none',
  platform: 'node',
  outdir,
  outbase: 'test/src'
});
