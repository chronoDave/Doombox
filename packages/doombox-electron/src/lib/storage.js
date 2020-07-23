const path = require('path');
const fse = require('fs-extra');

// Lib
const Reporter = require('./reporter');

module.exports = class Storage extends Reporter {
  /**
   * @param {string} root - Path to file
   * @param {string} name - File name
   * @param {object} defaults
   */
  constructor(root, name, defaults = {}) {
    super(path.resolve(root, 'log'));

    this.file = path.join(root, `${name}.json`);
    try {
      this.data = {
        ...defaults,
        ...fse.readJsonSync(this.file)
      };
    } catch (err) {
      // ENOENT is expected when file does not exist
      // Any other error is logged
      if (err.code !== 'ENOENT') this.logError(err);
      this.data = defaults;
    }
  }

  /**
   * Get storage data
   * @param {string?} key - Config key. If no key, return all data
   * @returns `data[key]` or `data`
  */
  get(key) {
    if (!key) return this.data;
    return this.data[key];
  }

  /**
   * Set storage data
   * @param {any} payload
   * @param {string?} key - Config key. If no key, override data
   * @returns `data[key] or `data`
   */
  set(payload, key) {
    if (!key) {
      this.data = payload;
    } else {
      this.data[key] = payload;
    }

    try {
      fse.writeFileSync(this.file, JSON.stringify(this.data, null, ' '));
    } catch (err) {
      this.logError(err);
    }

    return this.data;
  }

  /**
   * Update storage data
   * @param {any} payload
   * @param {string?} key - Config key. If no key, override data
   * @returns `data[key] or `data`
   */
  update(payload, key) {
    if (!key) {
      this.data = {
        ...this.data,
        ...payload
      };
    } else {
      this.data[key] = {
        ...this.data[key],
        ...payload
      };
    }

    try {
      fse.writeFileSync(this.file, JSON.stringify(this.data, null, ' '));
    } catch (err) {
      this.logError(err);
    }

    return this.data;
  }
};
