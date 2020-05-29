const path = require('path');
const fse = require('fs-extra');

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

    fse.writeFileSync(this.file, JSON.stringify(this.data, null, ' '));

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

    fse.writeFileSync(this.file, JSON.stringify(this.data, null, '\t'));

    return this.data;
  }
};
