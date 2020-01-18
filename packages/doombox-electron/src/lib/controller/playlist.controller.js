const { TYPE } = require('@doombox/utils');

// Utils
const { COLLECTION } = require('../../utils/const');

module.exports = class PlaylistController {
  constructor(database) {
    this.db = database;
    this.type = TYPE.IPC.PLAYLIST;
  }

  async create(event, { data }) {
    await this.db.create(COLLECTION.PLAYLIST, data.payload);
    this.read(event, { data: {} });
  }

  async read(event, { data }) {
    const docs = await this.db.read(COLLECTION.PLAYLIST, data.query, data.modifiers);
    event.sender.send(this.type, docs);
  }

  async update(event, { data }) {
    const docs = await this.db.update(COLLECTION.PLAYLIST, data.query, data.modifiers);
    event.sender.send(this.type, docs);
  }

  async updateOne(event, { data }) {
    await this.db.updateOne(COLLECTION.PLAYLIST, data._id, data.update);
    this.read(event, { data });
  }

  async delete(event, { data }) {
    await this.db.deleteOne(COLLECTION.PLAYLIST, data.payload._id);
    this.read(event, { data: {} });
  }
};
