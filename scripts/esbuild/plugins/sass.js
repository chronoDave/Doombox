const fsp = require('fs/promises');
const path = require('path');
const sass = require('sass');
const { fileURLToPath } = require('url');

const getLastModified = async (file, depedencies = []) => {
  const stats = await Promise.all([file, ...depedencies].map(x => fsp.stat(x)));

  return stats.reduce((acc, cur) => acc + cur, 0);
};

const compile = (file, depedencies = []) => sass.compile(file, {
  loadPaths: depedencies.map(depedency => path.resolve(process.cwd(), depedency))
});

module.exports = options => ({
  name: 'sass',
  setup: build => {
    const cache = new Map();

    const render = (file, lastModified) => {
      const { css, loadedUrls } = compile(file, options.depedencies);
      const result = {
        contents: css,
        loader: 'css',
        watchFiles: loadedUrls.map(fileURLToPath)
      };

      cache.set({ lastModified, result });

      return result;
    };

    if (options.ignore) {
      build.onResolve({ filter: options.ignore }, args => ({
        path: args.path,
        external: true
      }));
    }

    build.onLoad({ filter: /\.scss$/ }, async args => {
      try {
        const cached = cache.get(args.path);
        const lastModified = await getLastModified(args.path, options.depedencies);

        if (cached && cached.lastModified !== lastModified) return cached.result;
        return render(args.path, lastModified);
      } catch (err) {
        cache.delete(args.path);

        return {
          errors: [{
            text: err.message,
            location: null,
            detail: err
          }]
        };
      }
    });
  }
});
