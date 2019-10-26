const { app } = require('electron');
const path = require('path');
const fs = require('fs');

function parseDataFile(filePath, defaults) {
  try {
    return {
      ...defaults,
      ...JSON.parse(fs.readFileSync(filePath))
    };
  } catch (err) {
    return defaults;
  }
}

module.exports = class Store {
  constructor(options) {
    const userDataPath = app.getPath('userData');

    this.path = path.join(userDataPath, `${options.fileName}.json`);
    this.data = parseDataFile(this.path, options.defaults);
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    } catch (err) {
      throw err;
    }
  }

  delete(key) {
    this.data[key] = {};

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    } catch (err) {
      throw err;
    }
  }
};
