module.exports = class ImageController {
  /**
   * @param {object} db - Database object
   */
  constructor(db) {
    this.db = db;
  }

  async find(event, { query, projection }) {
    const docs = await this.db.find(query, projection);

    return Promise.resolve(docs);
  }
};
