const { ipcMain } = require('electron');
const { graphql } = require('graphql');

// Core
const { schema } = require('../schema');
const { resolver } = require('../resolver');

// Types
const {
  FETCH_USERS
} = require('../../../../utils/types/fetch');
const {
  RECEIVE_ERROR,
  RECEIVE_USERS
} = require('../../../../utils/types/receive');

module.exports = {
  ipcListener() {
    ipcMain.on(FETCH_USERS, (event, query) => {
      graphql(schema, query, resolver)
        .then(payload => event.sender.send(RECEIVE_USERS, payload))
        .catch(err => event.sender.send(RECEIVE_ERROR, err));
    });
  }
};
