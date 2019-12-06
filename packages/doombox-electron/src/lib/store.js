const { app } = require('electron');
const path = require('path');
const fs = require('fs');

function parseFile(file, defaults) {
  try {
    return {
      ...defaults,
      ...JSON.parse(fs.readFileSync(file))
    };
  } catch (err) {
    return defaults;
  }
}

module.exports = class Store {
  constructor(options) {
    const rootPath = app.getPath('userData');

    this.file = path.join(rootPath, `${options.fileName}.json`);
    this.data = parseFile(this.file, options.defaults);
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;

    try {
      fs.writeFileSync(this.file, JSON.stringify(this.data));
    } catch (err) {
      throw err;
    }
  }
};
