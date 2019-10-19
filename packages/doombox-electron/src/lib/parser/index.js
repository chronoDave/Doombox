const mm = require('music-metadata');
const path = require('path');
const fs = require('fs');
const shortid = require('shortid');

class MetadataParser {
  constructor(config = {}, db) {
    this.config = config;
    this.db = db;
    this.size = 0;
    this.payload = [];
  }

  async writeImage(file, _id) {
    const format = file.format.match(/(png|jpeg|jpg|gif)/i);
    const filePath = path.resolve(`${this.config.imagePath}/${_id}.${format ? format[0] : 'jpg'}`);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.data);
      this.db.create('images', {
        _id,
        path: filePath,
        picture: file.type,
        decription: file.description
      });
    }
  }

  async parseAll(files, event) {
    this.event = event;
    this.size = files.length;

    await this.parseRecursive(files);

    await this.db.create('library', this.payload);
    const docs = await this.db.read('library', {});

    event.handleSuccess(docs);

    this.payload = [];
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
          console.log(err);

          this.payload.push({ _id: shortid.generate(), file });

          return this.parseRecursive(files, iteration + 1);
        });
    }
    return Promise.resolve();
  }
}

module.exports = MetadataParser;
