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

  async read(event, { data, options = {} }) {
    const docs = await this.db.read(COLLECTION.PLAYLIST, data.query, data.modifiers);
    const librarySize = await this.db.count(COLLECTION.SONG);

    const libraryPlaylist = {
      _id: 'library',
      name: 'library',
      size: librarySize
    };

    let transformedDocs;
    if (options.collectionToCount) {
      transformedDocs = [
        libraryPlaylist,
        ...docs.map(({ collection, ...rest }) => ({
          ...rest,
          size: collection.length
        }))
      ];
    }

    event.sender.send(this.type, transformedDocs || docs);
  }

  async readOne(event, { data, options }) {
    const images = await this.db.read(COLLECTION.IMAGE, {}, { castObject: true });

    let payload;
    if (data._id === 'library' || data._id === 'label') {
      const library = await this.db.read(
        COLLECTION.SONG,
        data.query,
        { sort: options.sort || { file: 1 } }
      );

      payload = {
        action: options.action,
        docs: {
          name: options.name || data._id,
          collection: populateImages(library, images)
        }
      };
    } else {
      const playlist = await this.db.readOne(COLLECTION.PLAYLIST, data._id, data.projection);

      payload = {
        action: options.action,
        docs: {
          ...playlist,
          collection: populateImages(playlist.collection, images)
        }
      };
    }

    event.sender.send(this.type, payload);
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
