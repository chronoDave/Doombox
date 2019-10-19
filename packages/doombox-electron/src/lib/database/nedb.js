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

  create(collection, docs) {
    return this[collection]
      .insert(docs, (err, newDocs) => {
        if (err || !newDocs) throw err;
        Promise.resolve(newDocs);
      });
  }

  read(collection, { query, projection, sort }) {
    return new Promise(resolve => this[collection]
      .find(query || {})
      .projection(projection || {})
      .sort(sort || {})
      .exec((err, docs) => {
        if (err) throw err;
        resolve(docs);
      }));
  }

  readOne(collection, { query, projection }) {
    return new Promise(resolve => this[collection]
      .findOne(query || {}, projection || {}, (err, doc) => {
        if (err) throw err;
        resolve(doc);
      }));
  }

  update(collection, _id, docs) {
    return new Promise(resolve => this[collection]
      .update({ _id }, docs, err => {
        if (err) throw err;
        resolve();
      }));
  }

  delete(collection, _id) {
    return new Promise(resolve => this[collection]
      .remove({ _id }, (err, count) => {
        if (err) throw err;
        resolve(count);
      }));
  }

  drop(collection) {
    return new Promise(resolve => this[collection]
      .remove({}, { multi: true }, async (err, count) => {
        if (err) throw err;
        resolve(count);
      }));
  }
};
