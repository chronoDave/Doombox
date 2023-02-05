const { build } = require('esbuild');
const glob = require('fast-glob');
const fs = require('fs');
const path = require('path');

const outdir = path.resolve(__dirname, 'build');

fs.rmSync(outdir, { force: true, recursive: true });

// App
build({
  entryPoints: [
    ...glob.sync('src/app/**/*.spec.{ts,tsx}', { cwd: __dirname, absolute: true }),
    ...glob.sync('src/utils/**/*.spec.{ts,tsx}', { cwd: __dirname, absolute: true })
  ],
  bundle: true,
  external: [
    'tape',
    'electron',
    'sharp',
    'kuromoji'
  ],
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  legalComments: 'none',
  platform: 'node',
  outdir,
  outbase: 'test/src'
});

// Renderer
build({
  entryPoints: glob.sync('src/renderer/**/*.spec.{ts,tsx}', { cwd: __dirname, absolute: true }),
  bundle: true,
  external: [
    'tape',
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
