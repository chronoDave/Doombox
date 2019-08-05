const { app } = require('electron');
const Datastore = require('nedb');

// Types
const {
  create,
  READ
} = require('@doombox/utils/types');
const {
  SUCCESS,
  ERROR
} = require('@doombox/utils/types/asyncTypes');


module.exports = class NeDB {
  constructor() {
    const userDataPath = app.getPath('userData');

    this.users = new Datastore({
      filename: `${userDataPath}/nedb/users.db`,
      autoload: true
    });

    this.library = new Datastore({
      filename: `${userDataPath}/nedb/library.db`,
      autoload: true
    });

    this.images = new Datastore({
      filename: `${userDataPath}/nedb/images.db`,
      autoload: true
    });
  }

  async read(props) {
    const {
      ipcEvent: { event, type },
      collection,
      args
    } = props;

    try {
      const docs = await this[collection].find(args);
      event.sender.send(create([SUCCESS, READ, type]), docs);
    } catch (err) {
      event.sender.send(create([ERROR, READ, type]), err);
    }
  }

  async readOne(props) {
    const {
      ipcEvent: { event, type },
      collection,
      args
    } = props;

    console.log('hit');

    try {
      const docs = await this[collection].findOne(args);
      event.sender.send(create([SUCCESS, READ, type]), docs);
    } catch (err) {
      event.sender.send(create([ERROR, READ, type]), err);
    }
  }
};
