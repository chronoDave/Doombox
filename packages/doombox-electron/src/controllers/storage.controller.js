module.exports = class StorageController {
  /**
   * @param {Storage} storage
   */
  constructor(storage) {
    this.storage = storage;
  }

  read(event, { query }) {
    const data = this.storage.get(query);
    return Promise.resolve(data);
  }
};
