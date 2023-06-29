const fs = require('fs');
const path = require('path');

module.exports = (folders, options) => ({
  name: 'copy',
  setup: build => {
    build.onEnd(() => {
      folders.forEach(folder => {
        const cwd = options?.cwd ?? process.cwd();
        const dirIn = path.resolve(cwd, folder.in);
        const dirOut = path.resolve(cwd, folder.out);

        fs.rmSync(dirOut, { recursive: true, force: true });
        fs.cpSync(dirIn, dirOut, { recursive: true });
      });
    });
  }
});
