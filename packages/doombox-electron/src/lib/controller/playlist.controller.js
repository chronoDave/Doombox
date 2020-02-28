const { TYPE } = require('@doombox/utils');

// Utils
const { populateImages } = require('../../utils');
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
    const rawDocs = await this.db.read(COLLECTION.PLAYLIST, data.query, data.modifiers);
    const docs = rawDocs.map(playlist => ({
      ...playlist,
      src: playlist.src.path || null
    }));
    event.sender.send(this.type, docs);
  }

  async readOne(event, { data, options }) {
    const images = await this.db.read(COLLECTION.IMAGE, {}, { castObject: true });
    const rawDocs = await this.db.readOne(COLLECTION.PLAYLIST, data._id, data.projection);

    const docs = {
      action: options.action,
      docs: {
        ...rawDocs,
        collection: populateImages(rawDocs.collection, images)
      }
    };

    event.sender.send(this.type, docs);
  }

  async update(event, { data, options }) {
    await this.db.update(COLLECTION.PLAYLIST, data.query, data.update);
    this.read(event, { data, options });
  }

  async updateOne(event, { data, options }) {
    await this.db.updateOne(COLLECTION.PLAYLIST, data._id, data.update);
    this.read(event, { data, options });
  }

  async deleteOne(event, { data, options }) {
    await this.db.deleteOne(COLLECTION.PLAYLIST, data._id);
    this.read(event, { data, options });
  }
};
