const NeDB = require('../../../lib/database/nedb');

const database = new NeDB();

const getProfile = args => database.readOne(args);

module.exports = {
  getProfile
};
