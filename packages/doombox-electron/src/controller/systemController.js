class SystemController {
  constructor(store, logger) {
    this.store = store;
    this.logger = logger;
  }

  readCache({ handleSuccess, handleError }, id) {
    const doc = this.store.get(id);

    if (!doc || !doc._id) {
      const err = new Error(`No user found with id: ${id}`);

      this.logger.createLog(err);
      handleError(err);
    } else {
      handleSuccess(doc);
    }
  }
}

module.exports = SystemController;
