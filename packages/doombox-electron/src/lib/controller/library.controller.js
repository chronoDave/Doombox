const {
  TYPE,
  ACTION
} = require('@doombox/utils');
const fse = require('fs-extra');
const path = require('path');

// Utils
const {
  transformLibrary,
  transformLabel,
  transformLibraryDivider
} = require('../../utils');
const { COLLECTION } = require('../../utils/const');

module.exports = class LibraryController {
  constructor(database, parser, logger, imagePath) {
    this.db = database;
    this.parser = parser;
    this.type = TYPE.IPC.LIBRARY;
    this.log = logger;
    this.imagePath = imagePath;

    this.event = null;
  }

  sendInterrupt = status => {
    this.event.sender.send(TYPE.IPC.INTERRUPT, {
      type: this.type,
      status
    });
  }

  handleCreateImage = image => new Promise(async resolve => {
    try {
      const { data, ...rest } = image;

      const file = path.resolve(this.imagePath, `${image._id}.${image.format}`);

      await this.db.create(COLLECTION.IMAGE, { file, ...rest });
      await fse.writeFile(file, data);

      return resolve(image._id);
    } catch (err) {
      return resolve(image._id);
    }
  });

  handleUpdateImage = image => new Promise(async resolve => {
    try {
      const { data, _id, ...rest } = image;

      const file = path.resolve(this.imagePath, `${_id}.${image.format}`);

      await this.db.updateOne(COLLECTION.IMAGE, _id, { file, ...rest });
      await fse.writeFile(file, data);

      return resolve(_id);
    } catch (err) {
      return resolve(image._id);
    }
  });

  handleError = err => {
    this.log.createLogError(err, 'Parser', errJson => {
      this.sendInterrupt(ACTION.STATUS.ERROR);
      this.event.sender.send(TYPE.IPC.MESSAGE, { err: errJson });
    });
  }

  async create(event, { data }) {
    this.event = event;

    try {
      // Init
      this.sendInterrupt(ACTION.STATUS.PENDING);

      // Clean database
      await this.db.drop(COLLECTION.SONG);
      await this.db.drop(COLLECTION.IMAGE);

      if (this.imagePath && !this.skipCovers) {
        fse.removeSync(this.imagePath);
        fse.mkdirpSync(this.imagePath);
      }

      // Parse
      const handleParse = async ({ payload: { images, ...rest }, index, total }) => {
        event.sender.send(TYPE.IPC.MESSAGE, {
          file: rest.file, current: index, size: total
        });

        let payload = { ...rest };
        if (images) {
          const imageArray = await Promise.all(images.map(this.handleCreateImage));
          payload = { ...payload, images: imageArray };
        }

        await this.db.create(COLLECTION.SONG, payload);
      };

      await this.parser.parse(data.payload, handleParse);

      // IPC
      const songs = await this.db.read(COLLECTION.SONG, {});
      const images = await this.db.read(COLLECTION.IMAGE, {}, { castObject: true });

      event.sender.send(this.type, songs);
      event.sender.send(TYPE.IPC.IMAGE, images);
      this.sendInterrupt(ACTION.STATUS.SUCCESS);
    } catch (err) {
      this.handleError(err);
    }
  }

  async read(event, { data, options }) {
    event.sender.send(this.type, { status: ACTION.STATUS.PENDING });

    const docs = await this.db.read(COLLECTION.SONG, data.query, data.modifiers);
    const images = await this.db.read(COLLECTION.IMAGE, {}, { castObject: true });

    let transformedDocs = null;
    if (options.transform === 'library') {
      const library = transformLibrary(docs, images, options.sort);

      let { offset } = options;
      if (options.offset < 0) {
        offset = Math.ceil((library.length - options.limit) / options.limit) * options.limit;
      }
      if (options.offset >= library.length) offset = 0;

      transformedDocs = {
        transform: options.transform,
        offset,
        size: docs.length,
        hasMore: library.length > options.limit,
        collection: library
          .slice(offset, offset + options.limit)
          .map(transformLibraryDivider)
          .flat()
      };
    }

    if (options.transform === 'label') {
      const library = transformLabel(docs, images);

      transformedDocs = {
        size: docs.length,
        transform: options.transform,
        collection: library
      };
    }

    event.sender.send(this.type, transformedDocs || docs);
  }

  async update(event, { data }) {
    this.event = event;

    try {
      this.sendInterrupt(ACTION.STATUS.PENDING);

      // Parse
      const handleParse = async ({ payload, index, total }) => {
        event.sender.send(TYPE.IPC.MESSAGE, {
          file: payload.file, current: index, size: total
        });

        if (payload.images) {
          const images = await Promise.all(payload.images.map(this.handleUpdateImage));
          await this.db.update(
            COLLECTION.SONG,
            { file: payload.file },
            { ...payload, images }
          );
        } else {
          await this.db.update(
            COLLECTION.SONG,
            { file: payload.file },
            payload
          );
        }
      };

      await this.parser.parse(data.query, handleParse);

      // IPC
      const songs = await this.db.read(COLLECTION.SONG, {});
      const images = await this.db.read(COLLECTION.IMAGE, {}, { castObject: true });

      event.sender.send(this.type, songs);
      event.sender.send(TYPE.IPC.IMAGE, images);
      this.sendInterrupt(ACTION.STATUS.SUCCESS);
    } catch (err) {
      this.handleError(err);
    }
  }

  async delete(event, { data }) {
    await this.db.delete(COLLECTION.SONG, data.query);

    const songs = await this.db.read(COLLECTION.SONG, {});

    event.sender.send(this.type, songs);
  }
};
