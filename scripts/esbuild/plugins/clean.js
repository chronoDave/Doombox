const fs = require('fs');
const path = require('path');

module.exports = dirs => ({
  name: 'clean',
  setup: build => {
    build.onStart(() => {
      dirs.forEach(dir => {
        const folder = path.isAbsolute(dir) ?
          dir :
          path.join(process.cwd(), dir);

        fs.rmSync(folder, {
          recursive: true,
          force: true
        });
      });
    });
  }
});
