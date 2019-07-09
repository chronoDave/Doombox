const { ipcMain } = require('electron');
const { graphql } = require('graphql');

// Types
const {
  RECEIVE_ERROR,
  RECEIVE_USER
} = require('@doombox/utils/types/receive');
const {
  DELETE_USER
} = require('@doombox/utils/types/delete');

// Core
const { schema } = require('../schema');
const { rootResolver } = require('../resolver');

module.exports = {
  deleteListener() {
    ipcMain.on(DELETE_USER, (event, query) => {
      graphql(schema, query, rootResolver)
        .then(payload => event.sender.send(RECEIVE_USER, payload))
        .catch(err => event.sender.send(RECEIVE_ERROR, err));
    });
  }
};
