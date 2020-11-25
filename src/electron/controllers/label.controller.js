module.exports = class LabelController {
  /**
   * @param {object} db - Database object
   */
  constructor(db) {
    this.db = db;

    this.find = this.find.bind(this);
  }

  async find(event, { query, projection }) {
    const docs = await this.db.find(query, projection);

    return Promise.resolve(docs);
  }
};
