module.exports = class StorageController {
  /**
   * @param {Storage} storage
   */
  constructor(storage) {
    this.storage = storage;
  }

  read(event, { query }) {
    return new Promise(resolve => {
      const data = this.storage.get(query);
      return resolve(data);
    });
  }

  update(event, { payload }) {
    return new Promise(resolve => {
      const data = this.storage.set(payload);
      return resolve(data);
    });
  }

  updateOne(event, { _id, payload }) {
    return new Promise(resolve => {
      const data = this.storage.set(payload, _id);
      return resolve(data);
    });
  }
};
