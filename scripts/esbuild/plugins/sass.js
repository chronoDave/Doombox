const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const sass = require('sass');
const { fileURLToPath, pathToFileURL } = require('url');

const getLastModified = async files => {
  const stats = await Promise.all(files.map(file => fsp.stat(file)));
  return stats.reduce((acc, cur) => Math.max(acc, cur.mtimeMs), 0);
};

const createRender = options => async (css, file) => {
  const result = await sass.compileStringAsync(css, {
    style: options.style,
    loadPaths: options.depedencies.map(depedency => path.resolve(process.cwd(), depedency)),
    importer: {
      load: async url => ({
        contents: await fsp.readFile(fileURLToPath(url), 'utf-8'),
        syntax: url.pathname.endsWith('.scss') ? 'scss' : 'indented'
      }),
      canonicalize: url => {
        const depedencies = [
          path.parse(file).dir,
          ...options.depedencies
        ];

        for (const depedency of depedencies) {
          const dir = path.resolve(depedency, url);
          const isValid = fs.existsSync(dir);

          if (isValid) return pathToFileURL(dir);
        }

        return null;
      }
    }
  });

  return ({
    css,
    output: {
      loader: 'css',
      watchFiles: result.loadedUrls.map(fileURLToPath),
      contents: result.css
    },
    depedencies: result.loadedUrls,
    lastModified: await getLastModified(result.loadedUrls)
  });
};

module.exports = options => ({
  name: 'sass',
  setup: build => {
    const cache = new Map();
    const render = async (css, file) => {
      const result = await createRender(options, cache)(css, file);
      cache.set(file, result);
      return result.output;
    };

    if (options.ignore) {
      build.onResolve({ filter: options.ignore }, args => ({
        path: args.path,
        external: true
      }));
    }

    build.onLoad({ filter: /\.scss$/ }, async args => {
      try {
        const css = await fsp.readFile(args.path, 'utf-8');
        const cached = cache.get(args.path);

        if (!cached || cached.css !== css) return await render(css, args.path);

        const lastModified = await getLastModified(cached.depedencies);
        if (lastModified !== cached.lastModified) return await render(css, args.path);

        return cached.output;
      } catch (err) {
        cache.delete(args.path);
        throw err;
      }
    });
  }
});
