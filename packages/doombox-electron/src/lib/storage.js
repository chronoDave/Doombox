const path = require('path');
const fs = require('fs');

// Utils
const { stripKeys } = require('../utils');

module.exports = class Storage {
  /**
   * @param {String} root - Path to storage file
   * @param {String} name - Name of storage file
   * @param {Object} defaults - Default storage values
   */
  constructor(root, name, defaults) {
    this.file = path.join(root, `${name}.json`);
    this.data = this.parseFile(this.file, defaults);
  }

  /**
   * @param {String} file - Path to storage file
   * @param {Object} defaults - Default storage values
   */
  parseFile(file, defaults) {
    try {
      return {
        ...defaults,
        ...JSON.parse(fs.readFileSync(file))
      };
    } catch (err) {
      return defaults;
    }
  }

  get(key) {
    return stripKeys(this.data[key]);
  }

  all() {
    return Object.keys(this.data)
      .map(key => ([key, stripKeys(this.data[key])]))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }

  set(key, value) {
    this.data[key] = { ...this.data[key], ...value };

    try {
      fs.writeFileSync(this.file, JSON.stringify(this.data));
    } catch (err) {
      throw err;
    }
  }
};
