// Types
const { TYPES } = require('@doombox-utils/types');

module.exports = class AlbumController {
  /**
   * @param {object} db - Database object
   */
  constructor(db) {
    this.db = db;
  }

  async find(event, { query, projection }) {
    const docs = await this.db[TYPES.DATABASE.ALBUMS].find(query, projection);

    return Promise.resolve(docs);
  }
};
