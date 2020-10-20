// Types
const { TYPES } = require('@doombox-utils/types');

module.exports = class ImageController {
  /**
   * @param {object} db - Database object
   */
  constructor(db) {
    this.db = db;
  }

  async find(event, { query, projection }) {
    const docs = await this.db[TYPES.DATABASE.IMAGES].find(query, projection);

    return Promise.resolve(docs);
  }
};
