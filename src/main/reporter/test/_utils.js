const fs = require('fs');
const path = require('path');

require('esbuild').buildSync({
  entryPoints: [path.resolve(__dirname, '../reporter.js')],
  bundle: true,
  platform: 'node',
  outfile: path.resolve(__dirname, 'build.js')
});

const Reporter = require('./build');

const root = path.resolve(__dirname, 'test');

const setup = () => ({
  root,
  reporter: new Reporter(root)
});

const cleanup = () => fs.rmSync(root, { recursive: true, force: true });

module.exports = {
  setup,
  cleanup
};
