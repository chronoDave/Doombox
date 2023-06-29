const esbuild = require('esbuild');

module.exports = (config, options) => esbuild.context(config)
  .then(async context => {
    if (options?.watch) return context.watch();

    await context.rebuild();
    return context.dispose();
  })
  .catch(console.error);
