const path = require('path');

const glob = require('fast-glob');
const fse = require('fs-extra');

// Utils
const { parseMetadata } = require('../utils');

const { toArray } = require('../../../doombox-utils');
const { TYPES } = require('../../../doombox-types');

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

    if (this.folder) fse.mkdirpSync(this.folder);
  }

  async createImages(images) {
    const ids = [];

    for (let i = 0; i < images.length; i += 1) {
      try {
        const { data, _id, ...rest } = images[i];

        const file = path.resolve(this.folder, `${_id}.${rest.format}`);

        await this.db[TYPES.DATABASE.IMAGES].insert({ _id: file, ...rest });
        await fse.writeFile(file, data);

        ids.push(_id);
      } catch (err) {
        if (!err.message.includes('_id')) return Promise.reject(err);
      }
    }

    return Promise.resolve(ids);
  }

  async insert(event, { payload }) {
    const files = toArray(payload)
      .map(folder => glob.sync(`**/*.?(${this.fileTypes.join('|')})`, {
        cwd: folder,
        absolute: true
      }))
      .flat();

    for (let i = 0; i < files.length; i += 1) {
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
      } catch (err) {
        if (this.strict) return Promise.reject(err);
      }
    }

    this.db[TYPES.DATABASE.LIBRARY].persist();
    this.db[TYPES.DATABASE.IMAGES].persist();

    return Promise.resolve();
  }

  async find(event, { payload }) {
    try {
      const docs = await this.db[TYPES.DATABASE.LIBRARY].find(payload);

      return Promise.resolve(docs);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async drop() {
    await this.db[TYPES.DATABASE.LIBRARY].drop();

    return Promise.resolve();
  }
};
