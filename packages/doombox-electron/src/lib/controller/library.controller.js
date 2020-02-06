const {
  TYPE,
  ACTION
} = require('@doombox/utils');

// Utils
const {
  createLogicQuery,
  transformLibrary,
  transformLabel,
  transformLibraryDivider
} = require('../../utils');
const { COLLECTION } = require('../../utils/const');

module.exports = class LibraryController {
  constructor(database, parser, logger) {
    this.db = database;
    this.parser = parser;
    this.type = TYPE.IPC.LIBRARY;
    this.log = logger;

    this.event = null;
  }

  async create(event, { data }) {
    const sendInterrupt = status => {
      event.sender.send(TYPE.IPC.INTERRUPT, { type: this.type, status });
    };

    try {
      // Init
      sendInterrupt(ACTION.STATUS.PENDING);

      this.event = event;
      let index = 0;

      // Clean database
      await this.db.drop(COLLECTION.SONG);
      await this.db.drop(COLLECTION.IMAGE);

      // Parse
      const handleMessage = ({ current, size }) => {
        index += 1;
        this.event.sender.send(TYPE.IPC.MESSAGE, {
          file: current.file,
          current: index,
          size
        });
      };
      const songs = await this.parser.parse(data.payload, handleMessage);
      const images = await this.db.read(COLLECTION.IMAGE, {}, { castObject: true });

      // IPC
      event.sender.send(this.type, songs);
      event.sender.send(TYPE.IPC.IMAGE, images);
      sendInterrupt(ACTION.STATUS.SUCCESS);
    } catch (err) {
      const errJson = this.log.errToJson(err);
      this.log.createLogError(err, 'Parser');
      sendInterrupt(ACTION.STATUS.ERROR);
      this.event.sender.send(TYPE.IPC.MESSAGE, { err: errJson });
    }
  }

  async read(event, { data, options }) {
    event.sender.send(this.type, { status: ACTION.STATUS.PENDING });

    let query = null;
    if (options.regex) query = createLogicQuery(options.regex);

    const docs = await this.db.read(COLLECTION.SONG, query || data.query, data.modifiers);
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
        hasMore: library.length < options.limit,
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
};
