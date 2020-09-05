const path = require('path');

const { toArray, TYPES } = require('@doombox/utils');
const glob = require('fast-glob');
const fse = require('fs-extra');

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
  }

  async createImages(images) {
    const ids = [];

    for (let i = 0; i < images.length; i += 1) {
      try {
        const { data, _id, ...rest } = images[i];

        const file = path.resolve(this.folder, `${_id}.${rest.format}`);

        await this.db[TYPES.DATABASE.IMAGES].create({ _id: file, ...rest });
        await fse.writeFile(file, data);

        ids.push(_id);
      } catch (err) {
        if (!err.message.includes('_id')) return Promise.reject(err);
      }
    }

    return Promise.resolve(ids);
  }

  async create(event, { payload }) {
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

        await this.db[TYPES.DATABASE.LIBRARY].create({ images, ...rest });
      } catch (err) {
        if (this.strict) return Promise.reject(err);
      }
    }

    this.db[TYPES.DATABASE.LIBRARY].persist();
    this.db[TYPES.DATABASE.IMAGES].persist();

    return Promise.resolve();
  }
};
