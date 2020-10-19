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

  update(event, { query, update }) {
    this.storage.set(update, query);

    return Promise.resolve();
  }
};
