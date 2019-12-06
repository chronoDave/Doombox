const mm = require('music-metadata');
const path = require('path');
const shortid = require('shortid');
const fs = require('fs');

// Lib
const { createLogError } = require('../utils');

// Utils
const {
  PATH,
  COLLECTION
} = require('../utils/const');

module.exports = class MetadataParser {
  constructor(options = {}, db) {
    this.options = options;
    this.payload = [];
    this.db = db;
  }

  async writeFile(image, _id) {
    const format = image.format.match(/(png|jpg|gif)/i);
    const imagePath = path.resolve(
      PATH.IMAGE,
      `${_id}.${format ? format[0] : 'jpg'}`
    );

    if (!fs.existSync(imagePath)) {
      fs.writeFileSync(imagePath, image.data);

      const payload = {
        _id,
        path: imagePath,
        picture: image.type,
        description: image.description
      };

      try {
        this.db.create(COLLECTION.IMAGE, payload);
      } catch (err) {
        createLogError(err);
      }
    }
  }

  async parseAll(files) {
    try {
      await this.parseRecursive(files);
      await this.db.create(COLLECTION.SONG, this.payload);
    } catch (err) {
      createLogError(err);
    }
  }

  async parseRecursive(files, i = 0) {
    const file = files.shift();

    if (file) {
      try {
        const {
          format,
          common: { picture: pictures, ...tags }
        } = await mm.parseFile(file);

        const payload = {
          images: [],
          _id: shortid.generate(),
          file,
          format,
          ...tags
        };

        if (pictures) {
          pictures.forEach(async image => {
            const _id = `${tags.albumartist}-${tags.album}-${image.type}`
              .replace(/\/|\\|\*|\?|"|:|<|>|\.|\|/g, '_');

            payload.images.push(_id);
            this.writeImage(image, _id);
          });
        }

        this.payload.push(payload);

        return this.parseRecursive(files, i + 1);
      } catch (err) {
        createLogError(err);
      }
    }

    return Promise.resolve();
  }
};
