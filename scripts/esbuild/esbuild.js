const esbuild = require('esbuild');

module.exports = async (...configs) => {
  const watch = process.argv.slice(2).includes('-w');

  if (watch) {
    const contexts = await Promise.all(configs.map(config => esbuild.context(config)));
    return contexts.forEach(context => context.watch());
  }

  return configs.map(config => esbuild.build(config));
};
