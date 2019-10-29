const mm = require('music-metadata');
const path = require('path');
const fs = require('fs');
const shortid = require('shortid');

// Validation
const {
  schemaImage,
  schemaLibrary
} = require('@doombox/utils/validation/schema');

class MetadataParser {
  constructor(config = {}, db, logger) {
    this.config = config;
    this.db = db;
    this.size = 0;
    this.payload = [];
    this.logger = logger;
  }

  async writeImage(file, _id) {
    const format = file.format.match(/(png|jpeg|jpg|gif)/i);
    const filePath = path.resolve(`${this.config.imagePath}/${_id}.${format ? format[0] : 'jpg'}`);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.data);

      const image = {
        _id,
        path: filePath,
        picture: file.type,
        decription: file.description
      };

      try {
        await schemaImage.validate(image);
        await this.db.create('images', image);
      } catch (err) {
        this.logger.createLog(err);
      }
    }
  }

  async parseAll(files, event) {
    this.event = event;
    this.size = files.length;

    try {
      await this.parseRecursive(files);
      await schemaLibrary.validate(this.payload);
      await this.db.create('library', this.payload);
    } catch (err) {
      this.logger.createLog(err);
      event.handleError(err);
    }

    this.db.read('library')
      .then(docs => {
        if (!docs || docs.length === 0) {
          const err = new Error('No library created');

          this.logger.createLog(err);
          event.handleError(err);
        } else {
          event.handleSuccess(docs);
          this.payload = [];
        }
      })
      .catch(err => {
        this.logger.createLog(err);
        event.handleError(err);
      });
  }

  async parseRecursive(files, iteration = 0) {
    const file = files.shift();
    if (file) {
      return mm.parseFile(file)
        .then(async metadata => {
          this.event.handleMessage({
            current: iteration,
            total: this.size,
            file
          });

          const { format, common: { picture, ...tags } } = metadata;
          const payload = {
            images: [],
            _id: shortid.generate(),
            file,
            format,
            ...tags
          };

          // Image
          if (picture && this.config.parseImage) {
            picture.forEach(async image => {
              const _id = `${tags.albumartist}-${tags.album}-${image.type}`
                .replace(/\/|\\|\*|\?|"|:|<|>|\.|\|/g, '_');
              payload.images.push(_id);
              await this.writeImage(image, _id);
            });
          }

          this.payload.push(payload);

          return this.parseRecursive(files, iteration + 1);
        })
        .catch(err => {
          this.logger.createLog(err);
          return this.parseRecursive(files, iteration + 1);
        });
    }
    return Promise.resolve();
  }
}

module.exports = MetadataParser;
