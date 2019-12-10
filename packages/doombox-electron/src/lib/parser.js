const mm = require('music-metadata');
const path = require('path');
const shortid = require('shortid');
const fs = require('fs');
const { TYPE } = require('@doombox/utils');

// Lib
const { createLogError } = require('../utils');

// Utils
const { cleanFileName } = require('../utils');
const {
  PATH,
  COLLECTION
} = require('../utils/const');

module.exports = class MetadataParser {
  constructor(database, options) {
    this.payload = [];
    this.db = database;
    this.options = options;
    this.event = null;
    this.max = 0;
    this.log = null;
  }

  writeImage(image, _id) {
    const format = image.format.match(/(png|jpg|gif)/i);
    const imagePath = path.resolve(
      PATH.IMAGE,
      `${_id}.${format ? format[0] : 'jpg'}`
    );

    if (!fs.existsSync(imagePath)) {
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

  async parseAll(event, files) {
    this.event = event;
    this.max = files.length;

    if (this.options.logging) {
      this.log = path.join(PATH.LOG, `parser_${new Date().getTime()}.txt`);
    }

    try {
      await this.parseRecursive(files);
      const songs = await this.db.create(COLLECTION.SONG, this.payload);

      return Promise.resolve(songs);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  handleParseRecursiveReturn(file, files) {
    if (this.options.logging) {
      fs.appendFileSync(this.log, JSON.stringify(file));
    }

    this.event.sender.send(TYPE.IPC.MESSAGE, {
      current: file,
      value: this.max - files.length,
      max: this.max
    });

    return this.parseRecursive(files);
  }

  async parseRecursive(files) {
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
          metadata: { ...tags }
        };

        if (pictures) {
          pictures.forEach(async image => {
            const _id = cleanFileName(`${tags.albumartist}-${tags.album}-${image.type}`);
            payload.images.push(_id);
            this.writeImage(image, _id);
          });
        }

        this.payload.push(payload);

        return this.handleParseRecursiveReturn(file, files);
      } catch (err) {
        if (this.options.parseStrict) return Promise.reject(err);
        createLogError(err);

        return this.handleParseRecursiveReturn(file, files);
      }
    }

    return Promise.resolve();
  }
};
