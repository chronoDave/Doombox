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

  async createOne({ handleSuccess }, user) {
    const doc = await this.db.create('users', user);

    this.updateCache(doc._id);
    handleSuccess(doc);
  }

  async readOneWithId({ handleSuccess }, _id) {
    const doc = await this.db.readOneWithId('users', _id);
    handleSuccess(doc);
  }

  async updateOneWithId({ handleSuccess }, _id, modifiers) {
    const doc = await this.db.updateOneWithId('users', _id, modifiers);
    handleSuccess(doc);
  }

  async deleteOneWithId({ handleSuccess }, _id) {
    await this.db.deleteOneWithId('users', _id);
    handleSuccess();
  }
}

module.exports = UserController;
