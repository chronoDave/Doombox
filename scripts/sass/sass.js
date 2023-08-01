const chokidar = require('chokidar');
const fs = require('fs');
const minimist = require('minimist');
const path = require('path');
const sass = require('sass');

const { w, dev } = minimist(process.argv.slice(2));

const compile = file => {
  console.log(`[sass] building ${file.in}...`);

  const root = path.resolve(__dirname, '../../');
  const { name } = path.parse(file.in);

  console.time(`[sass] built ${file.in} in`);
  try {
    const { css, sourceMap } = sass.compile(path.resolve(root, file.in), {
      sourceMap: !!dev,
      style: dev ?
        'expanded' :
        'compressed',
      loadPaths: [
        path.resolve(root, 'src/renderer/scss/core')
      ]
    });
    console.timeEnd(`[sass] built ${file.in} in`);

    fs.writeFileSync(path.resolve(root, file.out, `${name}.css`), css);
    if (sourceMap?.file) fs.writeFileSync(path.resolve(root, file.out, `${name}.min.css`), sourceMap.file);
  } catch (err) {
    console.timeEnd(`[sass] built ${file.in} in`);
    console.error(err);
  }
};

module.exports = files => {
  files.forEach(compile);

  if (w) {
    files.forEach(file => {
      chokidar.watch([
        file.in,
        ...(file.depedencies ?? [])
      ]).on('change', () => compile(file));
    });
  }
};
