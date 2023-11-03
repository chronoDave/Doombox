const esbuild = require('esbuild');

module.exports = async (config, options = {}) => {
  if (options.watch) {
    const context = await esbuild.context(config);
    return context.watch();
  }

  return esbuild.build(config);
};
