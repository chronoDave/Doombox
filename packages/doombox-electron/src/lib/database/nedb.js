const Datastore = require('nedb');
const path = require('path');

// Utils
const { arrayToObject } = require('../../utils');

module.exports = class NeDB {
  /**
   * @param {(string[]|String)} tables - Array of table names or table name
   * @param {String=} root - Database path. If falsy, databases will be stored in memory
   */
  constructor(tables, root) {
    const collections = Array.isArray(tables) ? tables : [tables];
    collections.forEach(collection => {
      this[collection] = new Datastore({
        filename: root ? path.resolve(root, `${collection}.txt`) : null,
        autoload: !!root
      });
    });
  }

  /**
   * @param {String} collection
   * @param {(Object[]|Object)} docs - Single document or array of documents
   */
  async create(collection, docs) {
    return new Promise((resolve, reject) => this[collection]
      .insert(docs, (err, newDocs) => {
        if (err) reject(err);
        resolve(newDocs);
      }));
  }

  /**
   * @param {String} collection
   * @param {Object} query
   * @param {Object} modifiers
   * @param {Object=} modifiers.projection
   * @param {Object=} modifiers.sort
   * @param {Boolean=} modifiers.castObject
   */
  async read(collection, query = {}, modifiers = {}) {
    const {
      projection = {},
      sort = {},
      castObject
    } = modifiers;

    return new Promise((resolve, reject) => this[collection]
      .find(query)
      .projection(projection)
      .sort(sort)
      .exec((err, docs) => {
        if (err) reject(err);
        resolve(castObject ? arrayToObject('_id', docs) : docs);
      }));
  }

  /**
   * @param {String} collection
   * @param {String} _id
   * @param {Object=} projection
   */
  async readOne(collection, _id, projection = {}) {
    return new Promise((resolve, reject) => {
      if (!_id) return reject(new Error(`No '_id' provided: ${_id}`));
      return this[collection]
        .findOne({ _id })
        .projection(projection)
        .exec((err, docs) => {
          if (err) reject(err);
          resolve(docs);
        });
    });
  }

  /**
   * @param {String} collection
   * @param {Object=} query
   * @param {Object} update - Update query / new docs
   */
  async update(collection, query = {}, update) {
    return new Promise((resolve, reject) => {
      if (!update) return reject(new Error(`No 'update' provided: ${update}`));
      return this[collection]
        .update(
          query,
          update,
          { multi: true, returnUpdatedDocs: true },
          (err, count, newDocs) => {
            if (err) reject(err);
            resolve(newDocs);
          }
        );
    });
  }

  /**
   * @param {String} collection
   * @param {String} _id
   * @param {Object} update - Update query / new doc
   */
  async updateOne(collection, _id, update) {
    return new Promise((resolve, reject) => {
      if (!_id) return reject(new Error(`No '_id' provided: ${_id}`));
      return this[collection]
        .update(
          { _id },
          update,
          { returnUpdatedDocs: true },
          (err, count, newDocs) => {
            if (err) reject(err);
            resolve(newDocs);
          }
        );
    });
  }

  /**
   * @param {String} collection
   * @param {Object} query
   */
  async delete(collection, query) {
    return new Promise((resolve, reject) => {
      if (!query) return reject(new Error(`No 'query' provided: ${query}`));
      return this[collection]
        .remove(query, { multi: true }, (err, count) => {
          if (err) reject(err);
          resolve(count);
        });
    });
  }

  /**
   * @param {String} collection
   * @param {String} _id
   */
  async deleteOne(collection, _id) {
    return new Promise((resolve, reject) => {
      if (!_id) return reject(new Error(`No '_id' provided: ${_id}`));
      return this[collection]
        .remove({ _id }, { multi: false }, (err, count) => {
          if (err) reject(err);
          resolve(count);
        });
    });
  }

  /**
   * @param {String} collection
   */
  async drop(collection) {
    return new Promise((resolve, reject) => this[collection]
      .remove({}, { multi: true }, (err, count) => {
        if (err) reject(err);
        resolve(count);
      }));
  }

  /**
   * @param {String} collection
   * @param {Object=} query
   */
  async count(collection, query = {}) {
    return new Promise((resolve, reject) => this[collection]
      .count(query, (err, count) => {
        if (err) reject(err);
        resolve(count);
      }));
  }
};
