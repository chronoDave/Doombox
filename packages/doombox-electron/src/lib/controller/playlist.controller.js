const {
  TYPE,
  ACTION
} = require('@doombox/utils');

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
    const docs = await this.db.read(COLLECTION.PLAYLIST, data.query, data.modifiers);

    event.sender.send(this.type, { data: docs });
  }

  async readOne(event, { data }) {
    const doc = await this.db.readOne(COLLECTION.PLAYLIST, data._id, data.projection);
    const images = await this.db.read(COLLECTION.IMAGE, {}, { castObject: true });
    const songs = await this.db.read(
      COLLECTION.SONG,
      {
        $or: doc.collection.map(_id => ({ _id }))
      },
      {
        sort: {
          'metadata.disk.no': 1,
          'metadata.track.no': 1
        }
      }
    );
    const songsPopulated = songs.map(song => ({
      ...song,
      images: images ? song.images.map(id => images[id]) : []
    }));

    let payload;
    switch (data.action) {
      case ACTION.PLAYLIST.SET:
        payload = {
          action: data.action,
          data: {
            ...doc,
            collection: songsPopulated
          }
        };
        break;
      case ACTION.PLAYLIST.ADD:
        payload = {
          action: data.action,
          data: songsPopulated
        };
        break;
      default:
        payload = {
          action: ACTION.CRUD.READ_ONE,
          data: {
            ...doc,
            collection: songsPopulated
          }
        };
    }

    event.sender.send(this.type, payload);
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
