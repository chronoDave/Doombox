const path = require('path');
const fse = require('fs-extra');
const objectGet = require('lodash.get');
const objectSet = require('lodash.set');

module.exports = class Storage {
  /**
   * @param {string} root - Path to file
   * @param {string} name - File name
   * @param {object} defaults
   */
  constructor(root, name, defaults = {}) {
    this.file = path.join(root, `${name}.json`);
    this.data = {
      ...defaults,
      ...fse.readJsonSync(this.file, { throws: false })
    };
  }

  /**
   * Get storage data
   * @param {string?} key - Config key. If no key, return all data
   * @returns `data[key]` or `data`
  */
  get(key) {
    if (!key) return this.data;
    return objectGet(this.data, key);
  }

  /**
   * Set storage data
   * @param {any} payload
   * @param {string?} key - Config key. If no key, override data
   * @param {boolean} override - Should data be overwritten (default `false`)
   * @returns `data[key] or `data`
   */
  set(payload, key, override = false) {
    if (!key) {
      this.data = payload;
    } else {
      const newData = override ?
        payload :
        { ...this.get(key), ...payload };
      objectSet(this.data, key, newData);
    }

    fse.writeFileSync(this.file, JSON.stringify(this.data, null, '\t'));

    return this.data;
  }
};
