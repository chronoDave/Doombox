// Types
const { TYPES } = require('@doombox-utils/types');

module.exports = class ImageController {
  /**
   * @param {object} db - Database object
   */
  constructor(db) {
    this.db = db;
  }

  async find(event, { query }) {
    const docs = await this.db[TYPES.DATABASE.IMAGES].find(query);

    return Promise.resolve(docs);
  }
};
