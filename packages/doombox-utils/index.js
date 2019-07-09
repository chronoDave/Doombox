const createTypes = require('./types/create');
const deleteTypes = require('./types/delete');
const fetchTypes = require('./types/delete');
const receiveTypes = require('./types/receive');

module.exports = {
  types: {
    create: createTypes,
    delete: deleteTypes,
    fetch: fetchTypes,
    receive: receiveTypes
  }
};
