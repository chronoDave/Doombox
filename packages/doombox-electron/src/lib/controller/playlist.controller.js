const { TYPE } = require('@doombox/utils');

// Utils
const { COLLECTION } = require('../../utils/const');

module.exports = class PlaylistController {
  constructor(database) {
    this.db = database;
    this.type = TYPE.IPC.PLAYLIST;
  }

  async create(event, { data }) {
    const docs = await this.db.create(COLLECTION.PLAYLIST, data.payload);
    event.sender.send(this.type, docs);
  }

  async read(event, { data }) {
    const docs = await this.db.read(COLLECTION.PLAYLIST, data.query, data.modifiers);
    event.sender.send(this.type, docs);
  }

  async update(event, { data }) {
    const docs = await this.db.update(COLLECTION.PLAYLIST, data.query, data.modifiers);
    event.sender.send(this.type, docs);
  }
};
