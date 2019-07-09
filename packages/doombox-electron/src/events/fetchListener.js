const { ipcMain } = require('electron');
const { graphql } = require('graphql');

// Types
const {
  FETCH_USER
} = require('@doombox/utils/types/fetch');
const {
  RECEIVE_USER
} = require('@doombox/utils/types/receive');

// Core
const { schema } = require('../schema');
const { rootResolver } = require('../resolver');

module.exports = {
  fetchListener() {
    ipcMain.on(FETCH_USER, (event, query) => {
      graphql(schema, query, rootResolver)
        .then(payload => event.sender.send(RECEIVE_USER, payload))
        .catch(err => event.sender.send(RECEIVE_USER, err));
    });
  }
};
