class ImageController {
  constructor(db, logger) {
    this.db = db;
    this.logger = logger;
  }

  async readOneWithId({ handleSuccess, handleError }, _id) {
    this.db.readOneWithId('images', _id)
      .then(doc => {
        if (!doc) {
          const err = new Error(`No image found with id: ${_id}`);

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
}

module.exports = ImageController;
