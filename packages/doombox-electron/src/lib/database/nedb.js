const Datastore = require('nedb');
const path = require('path');

// Utils
const { arrayToObject } = require('../../utils');
const {
  PATH,
  COLLECTION
} = require('../../utils/const');

module.exports = class NeDB {
  constructor() {
    Object.values(COLLECTION).forEach(collection => {
      this[collection] = new Datastore({
        filename: path.resolve(PATH.DATABASE, `${collection}.txt`),
        autoload: true
      });
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
   * @param {Boolean} modifiers.castObject
   */
  read(collection, query, modifiers = {}) {
    const {
      projection,
      sort,
      castObject
    } = modifiers;

    return new Promise((resolve, reject) => {
      this[collection]
        .find(query || {})
        .projection(projection || {})
        .sort(sort || {})
        .exec((err, docs) => {
          if (err) reject(err);
          resolve(castObject ? arrayToObject('_id', docs) : docs);
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

  updateOne(collection, id, modifiers) {
    return new Promise((resolve, reject) => {
      this[collection].update(
        { id },
        modifiers,
        { returnUpdatedDocs: true },
        (err, count, newDocs) => {
          if (err) reject(err);
          resolve(newDocs, count);
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

  deleteOne(collection, id) {
    return new Promise((resolve, reject) => {
      this[collection].remove(
        { id },
        { multi: false },
        (err, count) => {
          if (err) reject(err);
          resolve(count);
        }
      );
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
};
