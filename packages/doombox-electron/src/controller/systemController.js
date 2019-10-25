class SystemController {
  constructor(store) {
    this.store = store;
  }

  readCache({ handleSuccess, handleError }, id) {
    const doc = this.store.get(id);

    if (!doc || !doc._id) return handleError();
    return handleSuccess(doc);
  }
}

module.exports = SystemController;
