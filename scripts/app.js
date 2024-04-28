const minimist = require('minimist');

const app = require('./esbuild/config/app');
const renderer = require('./esbuild/config/renderer');
const esbuild = require('./esbuild/esbuild');

const options = minimist(process.argv.slice(2));

return Promise.all([
  esbuild(app(options), { watch: options.w }),
  esbuild(renderer(options), { watch: options.w })
])
  .then(() => {
    if (!options.w) return process.exit();
    return null;
  });
