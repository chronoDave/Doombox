class ImageController {
  constructor(db) {
    this.db = db;
  }

  async readOneWithId({ handleSuccess, handleError }, _id) {
    this.db.readOneWithId('images', _id)
      .then(doc => {
        if (!doc) {
          handleError({ message: 'No image found' });
        } else {
          handleSuccess(doc);
        }
      })
      .catch(err => { throw err; });
  }
}

module.exports = ImageController;
