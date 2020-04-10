const { TYPE } = require('@doombox/utils');

// Utils
const { COLLECTION } = require('../../utils/const');

module.exports = class FavoritesController {
  constructor(database) {
    this.type = TYPE.IPC.FAVORITES;

    this.db = database;
  }

  async create(event, { data }) {
    await this.db.create(COLLECTION.FAVORITES, data.payload);

    this.read(event, { data });
  }

  async read(event, { data }) {
    const docs = await this.db.read(COLLECTION.FAVORITES, data.query, data.modifiers);

    event.sender.send(this.type, { data: docs });
  }

  async deleteOne(event, { data }) {
    await this.db.deleteOne(COLLECTION.FAVORITES, data._id);

    this.read(event, { data });
  }
};
