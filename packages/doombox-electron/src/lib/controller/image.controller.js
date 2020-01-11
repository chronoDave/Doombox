const { TYPE } = require('@doombox/utils');

// Utils
const { COLLECTION } = require('../../utils/const');

module.exports = class ImageController {
  constructor(database) {
    this.db = database;
    this.type = TYPE.IPC.IMAGE;
  }

  async create(event, { data }) {
    const docs = await this.db.create(COLLECTION.IMAGE, data.docs);
    event.sender.send(this.type, docs);
  }

  async read(event, { data }) {
    const docs = await this.db.read(COLLECTION.IMAGE, data.query, data.modifiers);
    event.sender.send(this.type, docs);
  }
};
