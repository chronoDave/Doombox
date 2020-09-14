module.exports = class StorageController {
  /**
   * @param {Storage} storage
   */
  constructor(storage) {
    this.storage = storage;
  }

  find(event, { query }) {
    const data = this.storage.get(query);
    return Promise.resolve(data);
  }
};
