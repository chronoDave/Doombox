const { ipcMain } = require('electron');
const { graphql } = require('graphql');

// Core
const { schema } = require('../schema');
const { rootResolver } = require('../resolver');

// Types
const {
  RECEIVE_ERROR,
  RECEIVE_USER
} = require('../../../../utils/types/receive');
const {
  DELETE_USER
} = require('../../../../utils/types/delete');

module.exports = {
  deleteListener() {
    ipcMain.on(DELETE_USER, (event, query) => {
      graphql(schema, query, rootResolver)
        .then(payload => event.sender.send(RECEIVE_USER, payload))
        .catch(err => event.sender.send(RECEIVE_ERROR, err));
    });
  }
};
