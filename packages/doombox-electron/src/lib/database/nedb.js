const { app } = require('electron');
const Datastore = require('nedb');

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
  }

  create(collection, args) {
    return new Promise((resolve, reject) => {
      this[collection].insert(args, (err, docs) => {
        if (err) reject(err);
        resolve(docs);
      });
    });
  }

  readOne(collection, args) {
    return new Promise((resolve, reject) => {
      this[collection].findOne(args, (err, docs) => {
        if (err || !docs) reject(err);
        resolve(docs);
      });
    });
  }

  update(collection, _id, args) {
    return new Promise((resolve, reject) => {
      this[collection].update(
        { _id }, args, err => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  delete(collection, _id) {
    return new Promise((resolve, reject) => {
      this[collection].remove({ _id }, (err, count) => {
        if (err || count === 0) reject(err);
        resolve();
      });
    });
  }
};
