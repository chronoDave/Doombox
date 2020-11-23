const fs = require('fs');
const path = require('path');

const toArray = require('./toArray');

/**
 * Return files from directory recursively
 * @param {string} dir
 * @param {string|string} fileType
 */
module.exports = (dir, fileTypes) => {
  const files = [];
  const filters = toArray(fileTypes);
  const stack = fs
    .readdirSync(dir, { withFileTypes: true })
    .map(dirEnt => ({ root: dir, dirEnt }));

  while (stack.length > 0) {
    const { root, dirEnt } = stack.pop();
    const abs = path.resolve(root, dirEnt.name);

    if (dirEnt.isDirectory()) {
      for (let i = 0, d = fs.readdirSync(abs, { withFileTypes: true }); i < d.length; i += 1) {
        stack.push({ root: abs, dirEnt: d[i] });
      }
    } else if (filters.some(key => abs.includes(key))) {
      files.push(abs);
    }
  }

  return files;
};
