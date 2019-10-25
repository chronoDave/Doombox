class UserController {
  constructor(store, db) {
    this.store = store;
    this.db = db;
  }

  async updateCache(_id) {
    this.store.set('user', { _id });
  }

  async deleteCache() {
    this.store.set('user', {});
  }

  async create({ handleSuccess }, payload, updateCache) {
    const doc = await this.db.create('users', payload);

    if (updateCache) this.updateCache(doc._id);

    handleSuccess(doc);
  }

  async readOne({ handleSuccess }, payload) {
    const doc = await this.db.readOne('users', payload);
    handleSuccess(doc);
  }

  async update({ handleSuccess }, { _id, ...rest }) {
    const doc = await this.db.update('users', _id, { $set: { ...rest } });
    handleSuccess(doc);
  }

  async delete({ handleSuccess }, _id) {
    await this.db.delete('users', _id);
    handleSuccess();
  }
}

module.exports = UserController;
