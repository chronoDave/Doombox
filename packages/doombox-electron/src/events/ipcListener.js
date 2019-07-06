const { ipcMain } = require('electron');
const { graphql } = require('graphql');

// Core
const { schema } = require('../schema');
const { resolver } = require('../resolver');

// Types
const {
  FETCH_USER,
  FETCH_USERS
} = require('../../../../utils/types/fetch');
const {
  RECEIVE_ERROR,
  RECEIVE_USER,
  RECEIVE_USERS
} = require('../../../../utils/types/receive');
const {
  CREATE_USER,
} = require('../../../../utils/types/receive');

module.exports = {
  ipcListener(store) {
    ipcMain.on(CREATE_USER, (event, payload) => {
      store.set('user', { ...payload });
    });
    ipcMain.on(FETCH_USER, event => {
      const user = store.get('user');
      event.sender.send(RECEIVE_USER, user);
    });
    ipcMain.on(FETCH_USERS, (event, query) => {
      graphql(schema, query, resolver)
        .then(payload => event.sender.send(RECEIVE_USERS, payload))
        .catch(err => event.sender.send(RECEIVE_ERROR, err));
    });
  }
};
