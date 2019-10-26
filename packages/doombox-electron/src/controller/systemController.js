class SystemController {
  constructor(store, logger) {
    this.store = store;
    this.logger = logger;
  }

  readCache({ handleSuccess, handleError }) {
    const doc = this.store.get('user');

    if (!doc || !doc._id) {
      handleError();
    } else {
      handleSuccess(doc);
    }
  }
}

module.exports = SystemController;
