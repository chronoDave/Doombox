const {
  ACTION,
  TYPE
} = require('@doombox/utils');
const fse = require('fs-extra');
const path = require('path');

// Utils
const { COLLECTION } = require('../../utils/const');

module.exports = class LibraryController {
  constructor(database, parser, logger, {
    imagePath,
    skipCovers
  }) {
    this.type = TYPE.IPC.LIBRARY;

    this.db = database;
    this.parser = parser;
    this.log = logger;

    this.imagePath = imagePath;
    this.skipCovers = skipCovers;
  }

  sendInterrupt(event, status) {
    event.sender.send(TYPE.IPC.INTERRUPT, {
      type: this.type,
      status
    });
  }

  sendError(event, err) {
    this.log.createLogError(err, 'Parser', errJson => {
      this.sendInterrupt(ACTION.STATUS.ERROR);
      event.sender.send(TYPE.IPC.MESSAGE, { err: errJson });
    });
  }

  sendMessage(event, message) {
    event.sender.send(TYPE.IPC.MESSAGE, message);
  }

  handleImage(image, action) {
    return new Promise(async resolve => {
      try {
        const { data, _id, ...rest } = image;
        const file = path.resolve(this.imagePath, `${_id}.${image.format}`);

        if (action === ACTION.CRUD.CREATE) {
          await this.db.create(COLLECTION.IMAGE, { _id, file, ...rest });
        }
        if (action === ACTION.CRUD.UPDATE_ONE) {
          await this.db.updateOne(COLLECTION.IMAGE, _id, { file, ...rest });
        }

        await fse.writeFile(file, data);

        return resolve(image._id);
      } catch (err) {
        return resolve(image._id);
      }
    });
  }

  async create(event, { data }) {
    try {
      this.sendInterrupt(event, ACTION.STATUS.PENDING);

      await this.db.drop(COLLECTION.SONG);
      await this.db.drop(COLLECTION.IMAGE);

      if (this.imagePath && !this.skipCovers) {
        fse.removeSync(this.imagePath);
        fse.mkdirpSync(this.imagePath);
      }

      await this.parser.parse(data.payload, async ({
        payload: docData,
        ...docRest
      }) => {
        this.sendMessage(event, { file: docData.file, ...docRest });

        let images = [];
        if (docData.images) {
          images = await Promise.all(docData.images
            .map(image => this.handleImage(image, ACTION.CRUD.CREATE)));
        }

        await this.db.create(COLLECTION.SONG, { ...docData, images });
      });

      this.sendInterrupt(event, ACTION.STATUS.SUCCESS);
      this.read(event, { data });
    } catch (err) {
      this.sendError(event, err);
    }
  }

  async read(event, { data, options }) {
    const docs = await this.db.read(COLLECTION.SONG, data.query, data.modifiers);
    const images = await this.db.read(COLLECTION.IMAGE, {}, { castObject: true });

    const docsPopulated = docs
      .map(song => ({
        ...song,
        images: images ? song.images.map(id => images[id]) : []
      }));

    switch (data.action) {
      case ACTION.PLAYLIST.SET:
        event.sender.send(TYPE.IPC.MIXTAPE, {
          data: {
            action: data.action,
            name: options.name,
            cover: docsPopulated[0].images[0],
            collection: docsPopulated
          }
        });
        break;
      case ACTION.PLAYLIST.ADD:
        event.sender.send(TYPE.IPC.MIXTAPE, {
          data: {
            action: data.action,
            collection: docsPopulated
          }
        });
        break;
      default:
        event.sender.send(this.type, { data: docsPopulated });
        break;
    }
  }

  async update(event, { data }) {
    try {
      this.sendInterrupt(event, ACTION.STATUS.PENDING);

      await this.parser.parse(data.query, async ({
        payload: docData,
        ...docRest
      }) => {
        this.sendMessage(event, { file: docData.file, ...docRest });

        let images = [];
        if (docData.images) {
          images = await Promise.all(docData.images
            .map(image => this.handleImage(image, ACTION.CRUD.UPDATE_ONE)));
        }

        await this.db.update(
          COLLECTION.SONG,
          { file: docData.file },
          { ...docData, images }
        );
      });

      this.sendInterrupt(event, ACTION.STATUS.SUCCESS);
      this.read(event, { data });
    } catch (err) {
      this.sendError(event, err);
    }
  }

  async delete(event, { data }) {
    await this.db.delete(COLLECTION.SONG, data.query);
    if (!data.query) await this.db.drop(COLLECTION.IMAGE);

    this.read(event, { data });
  }
};
