const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

module.exports = (dirs, options) => ({
  name: 'copy',
  setup: () => {
    const cwd = options?.cwd ?? process.cwd();
    const copy = dir => {
      console.time(`[copy] copied ${dir.in}`);
      fs.rmSync(path.resolve(cwd, dir.out), { recursive: true, force: true });
      fs.cpSync(path.resolve(cwd, dir.in), path.resolve(cwd, dir.out), { recursive: true });
      console.timeEnd(`[copy] copied ${dir.in}`);
    };

    dirs.forEach(copy);

    chokidar.watch(dirs.map(dir => dir.in), {
      cwd,
      awaitWriteFinish: true
    })
      .on('change', file => {
        const dir = dirs.find(x => file.split(path.sep).join(path.posix.sep).includes(x.in));
        if (dir) copy(dir);
      });
  }
});
