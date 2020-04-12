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

    this.read(event, { data });
  }

  async read(event, { data }) {
    const docs = await this.db.read(
      COLLECTION.PLAYLIST,
      data.query,
      data.modifiers
    );

    event.sender.send(TYPE.IPC.MIXOGRAPHY, { data: docs });
  }

  async readOne(event, { data, options }) {
    const doc = await this.db.readOne(COLLECTION.PLAYLIST, data._id);
    const images = await this.db.read(COLLECTION.IMAGE, {}, { castObject: true });
    const songs = await this.db.read(
      COLLECTION.SONG,
      { _id: { $in: doc.collection } }
    );
    const songsPopulated = songs.map(song => ({
      ...song,
      images: images ? song.images.map(id => images[id]) : []
    }));

    event.sender.send(options.cache ? this.type : TYPE.IPC.MIXTAPE, {
      data: {
        ...doc,
        action: data.action,
        collection: songsPopulated
      }
    });
  }

  async updateOne(event, { data }) {
    await this.db.updateOne(COLLECTION.PLAYLIST, data._id, data.update);

    this.read(event, { data });
  }

  async deleteOne(event, { data }) {
    await this.db.deleteOne(COLLECTION.PLAYLIST, data._id);

    this.read(event, { data });
  }
};
