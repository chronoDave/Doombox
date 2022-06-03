const path = require('path');
const fs = require('fs');
const objectGet = require('lodash.get');
const objectSet = require('lodash.set');

module.exports = class Storage {
  /**
   * @param {string} root - Path to file
   * @param {string} name - File name
   * @param {object} defaults
   */
  constructor(root, name, defaults) {
    this.file = path.join(root, `${name}.json`);
    this.defaults = defaults;
    this.data = {};
  }

  /** Read file data */
  read() {
    try {
      return JSON.parse(fs.readFileSync(this.file));
    } catch (err) {
      return {};
    }
  }

  /**
   * Normalize payload value to boolean
   * @param {object} payload
   * @param {string} key
   * */
  normalizeBool(payload, key) {
    const value = objectGet(payload, key);
    if (typeof value !== 'boolean') return objectGet(this.defaults, key);
    return value;
  }

  /**
   * Normalize payload value to string
   * @param {object} payload
   * @param {string} key
   */
  normalizeString(payload, key) {
    const value = objectGet(payload, key);
    if (!value || typeof value !== 'string') return objectGet(this.defaults, key);
    return value;
  }

  /**
   * Normalize payload value to int
   * @param {object} payload
   * @param {string} key
   * @param {object} options
   * @param {number} options.min - Min value
   * @param {number} options.max - Max value
   */
  normalizeInt(payload, key, { min, max } = {}) {
    const value = objectGet(payload, key);
    if (typeof value !== 'number') return objectGet(this.defaults, key);
    if (min && value < min) return min;
    if (max && value > max) return max;
    return value;
  }

  /**
   * Normalize payload value to enum
   * @param {object} payload
   * @param {string} key
   * @param {string[]} keys
   */
  normalizeEnum(payload, key, keys) {
    const value = objectGet(payload, key);
    if (!value || !keys.includes(value)) return objectGet(this.defaults, key);
    return value;
  }

  /**
   * Normalize payload value to array
   * @param {object} payload
   * @param {string} key
   * @param {function} filter - `true` if value contains invalid value
   */
  normalizeArray(payload, key, filter) {
    const value = objectGet(payload, key);
    if (!Array.isArray(value) || value.some(filter)) return objectGet(this.defaults, key);
    return value;
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
   * @returns `data[key] or `data`
   */
  set(payload, key) {
    if (!key) {
      this.data = payload;
    } else {
      const newData = typeof payload === 'object' ?
        { ...this.get(key), ...payload } :
        payload;
      objectSet(this.data, key, newData);
    }

    fs.writeFileSync(this.file, JSON.stringify(this.data, null, '\t'));

    return this.data;
  }
};
