const Datastore = require('nedb');
const path = require('path');

// Utils
const { arrayToObject } = require('../../utils');
const { COLLECTION } = require('../../utils/const');

module.exports = class NeDB {
  constructor(rootPath) {
    Object.values(COLLECTION).forEach(collection => {
      this[collection] = new Datastore({
        filename: rootPath ? path.resolve(rootPath, `${collection}.txt`) : null,
        autoload: !!rootPath
      });
    });
  }

  validate(collection, validate = {}) {
    const {
      _id,
      query,
      update,
      docs
    } = validate;

    return new Promise((resolve, reject) => {
      if (!this[collection]) reject(new Error(`Invalid collection: '${collection}'`));
      if (_id) {
        if (!_id.value) reject(new Error(`No _id provided: '${_id.value}'`));
        if (typeof _id.value !== 'string') reject(new Error(`_id must be of type "string": '${_id.value}'`));
      }
      if (query && !query.value) reject(new Error(`No query provided: '${query}'`));
      if (update && !update.value) reject(new Error(`No update provided: '${update}'`));
      if (docs && !docs.value) reject(new Error(`No docs provided: '${docs}'`));
      resolve();
    });
  }

  async create(collection, docs) {
    return new Promise((resolve, reject) => this.validate(collection, {
      docs: { value: docs }
    })
      .then(() => this[collection]
        .insert(docs, (err, newDocs) => {
          if (err) reject(err);
          resolve(newDocs);
        }))
      .catch(reject));
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

    return new Promise((resolve, reject) => this.validate(collection)
      .then(() => this[collection]
        .find(query || {})
        .projection(projection || {})
        .sort(sort || {})
        .exec((err, docs) => {
          if (err) reject(err);
          resolve(castObject ? arrayToObject('_id', docs) : docs);
        }))
      .catch(reject));
  }

  readOne(collection, _id, projection = {}) {
    return new Promise((resolve, reject) => this.validate(collection, {
      _id: { value: _id }
    })
      .then(() => this[collection]
        .findOne({ _id })
        .projection(projection)
        .exec((err, docs) => {
          if (err) reject(err);
          resolve(docs);
        }))
      .catch(reject));
  }

  /**
   * @param {Object} update - Update query / new docs
   */
  update(collection, query, update) {
    return new Promise((resolve, reject) => this.validate(collection, {
      query: { value: query },
      update: { value: update }
    })
      .then(() => this[collection].update(
        query,
        update,
        { multi: true, returnUpdatedDocs: true },
        (err, count, newDocs) => {
          if (err) reject(err);
          resolve(newDocs);
        }
      ))
      .catch(reject));
  }

  /**
   * @param {Object} update - Update query / new doc
   */
  updateOne(collection, _id, update) {
    return new Promise((resolve, reject) => this.validate(collection, {
      _id: { value: _id },
      update: { value: update }
    })
      .then(() => this[collection].update(
        { _id },
        update,
        { returnUpdatedDocs: true },
        (err, count, newDocs) => {
          if (err) reject(err);
          resolve(newDocs);
        }
      ))
      .catch(reject));
  }

  delete(collection, query) {
    return new Promise((resolve, reject) => this.validate(collection, {
      query: { value: query }
    })
      .then(() => this[collection].remove(query, { multi: true }, (err, count) => {
        if (err) reject(err);
        this[collection].persistence.compactDatafile();
        resolve(count);
      }))
      .catch(reject));
  }

  deleteOne(collection, _id) {
    return new Promise((resolve, reject) => this.validate(collection, {
      _id: { value: _id }
    })
      .then(() => this[collection].remove({ _id }, { multi: false }, (err, count) => {
        if (err) reject(err);
        resolve(count);
      }))
      .catch(reject));
  }

  drop(collection) {
    return new Promise((resolve, reject) => this.validate(collection)
      .then(() => this[collection].remove({}, { multi: true }, (err, count) => {
        if (err) reject(err);
        resolve(count);
      }))
      .catch(reject));
  }

  count(collection, query) {
    return new Promise((resolve, reject) => this.validate(collection, {
      query: { value: query }
    })
      .then(() => this[collection].count(query, (err, count) => {
        if (err) reject(err);
        resolve(count);
      }))
      .catch(reject));
  }
};
