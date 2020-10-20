const path = require('path');
const fs = require('fs');

const glob = require('fast-glob');
const groupBy = require('lodash.groupby');
const throttle = require('lodash.throttle');

const { toArray } = require('@doombox-utils');
const { IPC, TYPES } = require('@doombox-utils/types');

// Utils
const { parseMetadata } = require('../utils');

module.exports = class LibraryController {
  /**
   * @param {object} db - Database object
   * @param {object} options
   * @param {string} options.folder - Image folder (default `null`)
   * @param {boolean} options.strict - Is strict mode enabled (default `false`)
   * @param {string[]} options.fileTypes - Allowed file types (default `['mp3']`)
   * @param {boolean} options.skipCovers - Should parser skip covers (default `false`)
   * @param {string[]} options.requiredMetadata - Required metadata (default `[]`)
   */
  constructor(db, {
    folder = null,
    strict = false,
    fileTypes = ['mp3'],
    skipCovers = false,
    requiredMetadata = []
  } = {}) {
    this.db = db;
    this.folder = folder;

    this.strict = strict;
    this.fileTypes = fileTypes;
    this.skipCovers = skipCovers;
    this.requiredMetadata = requiredMetadata;

    if (this.folder) fs.mkdirSync(this.folder, { recursive: true });
  }

  async createImages(images) {
    const ids = [];

    for (let i = 0; i < images.length; i += 1) {
      const { data, _id, ...rest } = images[i];
      const file = path.resolve(this.folder, `${_id}.${rest.format}`);

      ids.push(_id);

      try {
        await this.db[TYPES.DATABASE.IMAGES].insert({ _id, file, ...rest });
        fs.writeFileSync(file, data);
      } catch (err) {
        if (!err.message.includes('_id')) return Promise.reject(err);
      }
    }

    return Promise.resolve(ids);
  }

  async createAlbums() {
    const songs = await this.db[TYPES.DATABASE.LIBRARY].find();

    const albums = Object
      .entries(groupBy(songs, '_albumId'))
      .map(([album, albumSongs]) => ({
        _id: album,
        artists: [...new Set(albumSongs.map(({ metadata: { artist } }) => artist))],
        album: albumSongs[0].metadata.album,
        cover: albumSongs[0].images,
        year: albumSongs[0].metadata.year,
        date: albumSongs[0].metadata.date,
        cdid: albumSongs[0].metadata.cdid,
        songs: albumSongs.map(({ _id }) => _id),
        duration: albumSongs.reduce((acc, { format: { duration } }) => acc + duration, 0)
      }));

    await this.db[TYPES.DATABASE.ALBUMS].insert(albums, { persist: true });

    return Promise.resolve();
  }

  async createLabels() {
    const songs = await this.db[TYPES.DATABASE.LIBRARY].find();

    const labels = Object
      .entries(groupBy(songs, '_labelId'))
      .map(([label, labelSongs]) => ({
        _id: label,
        label: labelSongs[0].metadata.albumartist,
        albums: Object.keys(groupBy(labelSongs, '_albumId')),
        songs: labelSongs.map(({ _id }) => _id),
        duration: labelSongs.reduce((acc, { format: { duration } }) => acc + duration, 0)
      }));

    await this.db[TYPES.DATABASE.LABELS].insert(labels, { persist: true });

    return Promise.resolve();
  }

  async insert(event, { payload }) {
    const sendInterrupt = throttle(data => event.sender.send(
      IPC.CHANNEL.INTERRUPT,
      { data, error: null }
    ), 10);
    const files = toArray(payload)
      .map(folder => glob.sync(`**/*.?(${this.fileTypes.join('|')})`, {
        cwd: folder,
        absolute: true
      }))
      .flat();

    for (let i = 0, total = files.length; i < total; i += 1) {
      try {
        const { images: rawImages, ...rest } = await parseMetadata(files[i], {
          skipCovers: this.skipCovers,
          requiredMetadata: this.requiredMetadata
        });

        let images = [];
        if (rawImages.length > 0 && this.folder) {
          images = await this.createImages(rawImages);
        }

        await this.db[TYPES.DATABASE.LIBRARY].insert({ images, ...rest });
        sendInterrupt({
          file: rest.file,
          index: i + 1,
          total
        });
      } catch (err) {
        if (this.strict) return Promise.reject(err);
      }
    }

    this.db[TYPES.DATABASE.LIBRARY].persist();
    this.db[TYPES.DATABASE.IMAGES].persist();

    await this.createAlbums();
    await this.createLabels();

    return Promise.resolve();
  }

  async find(event, { query, projection }) {
    try {
      const docs = await this.db[TYPES.DATABASE.LIBRARY].find(query, projection);

      return Promise.resolve(docs);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async drop() {
    await this.db[TYPES.DATABASE.LIBRARY].drop();
    await this.db[TYPES.DATABASE.LABELS].drop();
    await this.db[TYPES.DATABASE.ALBUMS].drop();
    await this.db[TYPES.DATABASE.IMAGES].drop();

    if (this.folder) {
      const files = fs.readdirSync(this.folder);
      for (let i = 0; i < files.length; i += 1) {
        fs.unlinkSync(path.join(this.folder, files[i]));
      }
    }

    return Promise.resolve();
  }
};
