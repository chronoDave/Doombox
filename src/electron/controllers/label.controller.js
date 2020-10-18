// Types
const { TYPES } = require('@doombox-utils/types');

module.exports = class LabelController {
  /**
   * @param {object} db - Database object
   */
  constructor(db) {
    this.db = db;
  }

  async find(event, { query }) {
    const docs = await this.db[TYPES.DATABASE.LABELS].find(query);

    return Promise.resolve(docs);
  }
};
