// Database
const NeDB = require('../../../lib/database/nedb');

const db = new NeDB();

const create = (collection, args, verbose) => db.create(collection, args, verbose);
const read = (collection, args) => db.read(collection, args);
const readOne = (collection, args) => db.readOne(collection, args);
const update = (collection, _id, args) => db.update(collection, _id, args);
const remove = (collection, _id) => db.delete(collection, _id);
const drop = collection => db.drop(collection);

module.exports = {
  create,
  read,
  readOne,
  update,
  remove,
  drop
};
