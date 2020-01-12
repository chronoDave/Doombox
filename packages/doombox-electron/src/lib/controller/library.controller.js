const {
  TYPE,
  ACTION
} = require('@doombox/utils');

// Utils
const { createLogicQuery } = require('../../utils');
const { COLLECTION } = require('../../utils/const');

module.exports = class LibraryController {
  constructor(database, parser) {
    this.db = database;
    this.parser = parser;
    this.type = TYPE.IPC.LIBRARY;

    this.event = null;
  }

  async create(event, { data }) {
    const sendInterrupt = status => {
      event.sender.send(TYPE.IPC.INTERRUPT, { type: this.type, status });
    };

    // Init
    sendInterrupt(ACTION.INTERRUPT.PENDING);

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
    sendInterrupt(ACTION.INTERRUPT.SUCCESS);
  }

  async read(event, { data }) {
    const docs = await this.db.read(
      COLLECTION.SONG,
      data.logic ? createLogicQuery(data.logic) : data.query,
      data.modifiers
    );
    event.sender.send(this.type, docs);
  }
};
