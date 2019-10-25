class ImageController {
  constructor(db) {
    this.db = db;
  }

  async readOne({ handleSuccess, handleError }, payload) {
    const doc = await this.db.readOne('images', payload);

    if (!doc) return handleError({ message: 'No image found' });
    return handleSuccess(doc);
  }
}

module.exports = ImageController;
