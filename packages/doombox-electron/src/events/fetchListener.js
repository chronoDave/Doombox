const { ipcMain } = require('electron');
const { graphql } = require('graphql');

// Core
const { schema } = require('../schema');
const { rootResolver } = require('../resolver');

// Types
const {
  FETCH_USER
} = require('../../../../utils/types/fetch');
const {
  RECEIVE_USER,
  RECEIVE_ERROR
} = require('../../../../utils/types/receive');

module.exports = {
  fetchListener() {
    ipcMain.on(FETCH_USER, (event, query) => {
      graphql(schema, query, rootResolver)
        .then(payload => event.sender.send(RECEIVE_USER, payload))
        .catch(err => event.sender.send(RECEIVE_ERROR, err));
    });
  }
};
