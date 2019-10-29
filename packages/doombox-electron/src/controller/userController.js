// Validation
const { schemaUser } = require('@doombox/utils/validation/schema');

class UserController {
  constructor(store, db, logger) {
    this.store = store;
    this.db = db;
    this.logger = logger;
  }

  async updateCache(_id) {
    this.store.set('user', { _id });
  }

  async deleteCache() {
    this.store.set('user', {});
  }

  async createOne({ handleSuccess, handleError }, user) {
    try {
      await schemaUser.validate(user);
    } catch (err) {
      this.logger.createLog(err);
      return handleError(err);
    }

    return this.db.create('users', user)
      .then(doc => {
        if (!doc) {
          const err = new Error(`Failed to create user: ${user}`);

          this.logger.createLog(err);
          handleError(err);
        } else {
          this.updateCache(doc._id);
          handleSuccess(doc);
        }
      })
      .catch(err => {
        this.logger.createLog(err);
        handleError(err);
      });
  }

  async readOneWithId({ handleSuccess, handleError }, _id) {
    this.db.readOneWithId('users', _id)
      .then(doc => {
        if (!doc) {
          const err = new Error(`No user found with id: ${_id}`);

          this.logger.createLog(err);
          handleError(err);
        } else {
          handleSuccess(doc);
        }
      })
      .catch(err => {
        this.logger.createLog(err);
        handleError(err);
      });
  }

  async updateOneWithId({ handleSuccess, handleError }, _id, modifiers) {
    this.db.updateOneWithId('users', _id, modifiers)
      .then(doc => {
        if (!doc) {
          const err = new Error(`Failed to update user with id: ${_id} and modifiers: ${modifiers.toString()}`);

          this.logger.createLog(err);
          handleError(err);
        } else {
          handleSuccess(doc);
        }
      })
      .catch(err => {
        this.logger.createLog(err);
        handleError(err);
      });
  }

  async deleteOneWithId({ handleSuccess, handleError }, _id) {
    this.db.deleteOneWithId('users', _id)
      .then(() => handleSuccess())
      .catch(err => {
        this.logger.createLog(err);
        handleError(err);
      });
  }
}

module.exports = UserController;
