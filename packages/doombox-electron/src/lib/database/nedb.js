const { app } = require('electron');
const Datastore = require('nedb');

module.exports = class NeDB {
  constructor() {
    const userDataPath = app.getPath('userData');

    this.users = new Datastore({
      filename: `${userDataPath}/nedb/users.db`,
      autoload: true
    });

    this.images = new Datastore({
      filename: `${userDataPath}/nedb/images.db`,
      autoload: true
    });

    this.library = new Datastore({
      filename: `${userDataPath}/nedb/library.db`,
      autoload: true
    });

    this.backlog = new Datastore({
      filename: `${userDataPath}/nedb/backlog.db`,
      autoload: true
    });
  }

  create(collection, args) {
    return new Promise((resolve, reject) => {
      this[collection].insert(args, (err, docs) => {
        if (err) throw err;
        if (!docs) reject('error:mongodb_create');
        resolve(docs);
      });
    });
  }

  read({ collection, query, projection }) {
    return new Promise(resolve => {
      this[collection].find(
        query || {},
        projection || {},
        (err, docs) => {
          resolve(docs);
        }
      );
    });
  }

  readOne({ collection, query, projection }) {
    return new Promise(resolve => {
      this[collection].findOne(
        query || {},
        projection || {},
        (err, doc) => {
          if (err) throw err;
          resolve(doc);
        }
      );
    });
  }

  update(collection, _id, args) {
    return new Promise(resolve => {
      this[collection].update({ _id }, args, err => {
        if (err) throw err;
        resolve();
      });
    });
  }

  delete(collection, _id) {
    return new Promise((resolve, reject) => {
      this[collection].remove({ _id }, (err, count) => {
        if (err) throw err;
        if (count === 0) reject('error:mongodb_delete');
        resolve(count);
      });
    });
  }

  drop(collection) {
    return new Promise(resolve => {
      this[collection].remove({}, { multi: true }, async (err, count) => {
        if (err) throw err;
        resolve(count);
      });
    });
  }

  count(collection, args) {
    return new Promise((resolve, reject) => {
      this[collection].count(args, (err, count) => {
        if (err) throw err;
        if (count === 0) reject('error:mongodb_count');
        resolve(count);
      });
    });
  }
};
