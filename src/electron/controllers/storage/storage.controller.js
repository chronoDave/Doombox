module.exports = class StorageController {
  /**
   * @param {Storage} storage
   */
  constructor(storage) {
    this.storage = storage;

    this.find = this.find.bind(this);
    this.update = this.update.bind(this);
  }

  find(event, { query }) {
    const data = this.storage.get(query);

    return Promise.resolve(data);
  }

  update(event, { query, update }) {
    const data = this.storage.set(update, query);

    return Promise.resolve(data);
  }
};
