// Types
const { TYPES } = require('../../../doombox-types');

module.exports = class AlbumController {
  /**
   * @param {object} db - Database object
   */
  constructor(db) {
    this.db = db;
  }

  async find(event, { query }) {
    const docs = await this.db[TYPES.DATABASE.ALBUMS].find(query);

    return Promise.resolve(docs);
  }
};