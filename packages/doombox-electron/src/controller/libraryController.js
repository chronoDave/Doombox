const {
  TYPE,
  INTERRUPT
} = require('@doombox/utils');
const makeDir = require('make-dir');
const rimraf = require('rimraf');
const glob = require('glob');

// Lib
const MetadataParser = require('../lib/parser');

// Utils
const { handleErrorIpc } = require('../utils');
const {
  PATH,
  COLLECTION
} = require('../utils/const');

module.exports = class LibraryController {
  constructor(database, options) {
    this.type = TYPE.IPC.LIBRARY;
    this.db = database;
    this.options = options;
    this.parser = new MetadataParser(database, { parseStrict: options.parseStrict });
  }

  getGlobPattern() {
    if (this.options.glob) return glob;
    return `/**/*.?(${this.options.fileFormats.join('|')})`;
  }

  globFolder(folder) {
    return new Promise((resolve, reject) => glob(
      this.getGlobPattern(),
      { root: folder },
      (err, matches) => {
        if (err) reject(err);
        resolve(matches);
      }
    ));
  }

  createQueryFromRegex = regex => {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(regex)) reject(new Error(`${JSON.stringify(regex)} is not an array`));
      const query = {
        $or: regex.map(({ property, expression }) => ({
          [property]: { $regex: new RegExp(expression, 'i') }
        }))
      };
      resolve(query);
    });
  };

  async create(event, { data }) {
    if (!data.folders || !Array.isArray(data.folders)) {
      return handleErrorIpc(
        event,
        this.type,
        new Error(`No valid property folders found in data: ${JSON.stringify(data)}`)
      );
    }

    event.sender.send(TYPE.IPC.INTERRUPT, {
      type: TYPE.IPC.LIBRARY,
      status: INTERRUPT.PENDING
    });

    try {
      await this.db.drop(COLLECTION.SONG);
      await this.db.drop(COLLECTION.IMAGE);

      rimraf.sync(PATH.IMAGE);
      makeDir.sync(PATH.IMAGE);

      const files = await Promise.all(data.folders.map(folder => this.globFolder(folder)));
      const songs = await this.parser.parseAll(event, files.flat());

      event.sender.send(TYPE.IPC.INTERRUPT, {
        type: TYPE.IPC.LIBRARY,
        status: INTERRUPT.SUCCESS
      });

      const images = await this.db.read(COLLECTION.IMAGE, {}, { castObject: true });
      event.sender.send(TYPE.IPC.IMAGE, images);

      return event.sender.send(this.type, songs);
    } catch (err) {
      event.sender.send(TYPE.IPC.INTERRUPT, {
        type: TYPE.IPC.LIBRARY,
        status: INTERRUPT.ERROR
      });
      return handleErrorIpc(event, this.type, err);
    }
  }

  async read(event, { data }) {
    try {
      const query = data.regex ?
        await this.createQueryFromRegex(data.regex) :
        data.query;
      const payload = await this.db.read(COLLECTION.SONG, query, data.modifiers);
      event.sender.send(TYPE.IPC.LIBRARY, payload);
    } catch (err) {
      handleErrorIpc(event, this.type, err);
    }
  }
};
