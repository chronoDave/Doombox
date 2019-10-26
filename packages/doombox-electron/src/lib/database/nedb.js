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
    return new Promise((resolve, reject) => {
      this[collection].insert(docs, (err, newDocs) => {
        if (err) reject(err);
        resolve(newDocs);
      });
    });
  }

  /**
   * @param {Object} modifiers
   * @param {Object} modifiers.projection
   * @param {Object} modifiers.sort
   */
  read(collection, query, modifiers = {}) {
    const { projection, sort } = modifiers;

    return new Promise((resolve, reject) => {
      this[collection]
        .find(query)
        .projection(projection || {})
        .sort(sort || {})
        .exec((err, docs) => {
          if (err) reject(err);
          resolve(docs);
        });
    });
  }

  readOne(collection, query, projection = {}) {
    return new Promise((resolve, reject) => {
      this[collection]
        .findOne(query)
        .projection(projection)
        .exec((err, docs) => {
          if (err) reject(err);
          resolve(docs);
        });
    });
  }

  readOneWithId(collection, _id, projection = {}) {
    return new Promise((resolve, reject) => {
      this[collection]
        .findOne({ _id })
        .projection(projection)
        .exec((err, doc) => {
          if (err) reject(err);
          resolve(doc);
        });
    });
  }

  /**
   * @param {Object} modifiers - New document / set of modifiers
   */
  update(collection, query, modifiers) {
    return new Promise((resolve, reject) => {
      this[collection].update(
        query,
        modifiers,
        { multi: true, returnUpdatedDocs: true },
        (err, count, newDocs) => {
          if (err) reject(err);
          resolve(newDocs, count);
        }
      );
    });
  }

  /**
   * @param {Object} modifiers - New document / set of modifiers
   */
  updateOneWithId(collection, _id, modifiers) {
    return new Promise((resolve, reject) => {
      this[collection].update(
        { _id },
        modifiers,
        { returnUpdatedDocs: true },
        (err, count, newDoc) => {
          if (err) reject(err);
          resolve(newDoc, count);
        }
      );
    });
  }

  delete(collection, query) {
    return new Promise((resolve, reject) => {
      this[collection].remove(
        query,
        { multi: true },
        (err, count) => {
          if (err) reject(err);
          resolve(count);
        }
      );
    });
  }

  deleteOneWithId(collection, _id) {
    return new Promise((resolve, reject) => {
      this[collection].remove({ _id }, {}, (err, count) => {
        if (err) reject(err);
        resolve(count);
      });
    });
  }

  drop(collection) {
    return new Promise((resolve, reject) => {
      this[collection].remove({}, { multi: true }, (err, count) => {
        if (err) reject(err);
        resolve(count);
      });
    });
  }

  count(collection, query) {
    return new Promise((resolve, reject) => {
      this[collection].count(query, (err, count) => {
        if (err) reject(err);
        resolve(count);
      });
    });
  }

  countOneWithId(collection, _id) {
    return new Promise((resolve, reject) => {
      this[collection].count({ _id }, (err, count) => {
        if (err) reject(err);
        resolve(count);
      });
    });
  }
};
