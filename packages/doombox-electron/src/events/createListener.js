const { ipcMain } = require('electron');
const { graphql } = require('graphql');

// Types
const {
  CREATE_USER,
  CREATE_IMAGE
} = require('@doombox/utils/types/create');
const {
  RECEIVE_USER,
  RECEIVE_IMAGE
} = require('@doombox/utils/types/receive');

// Core
const { schema } = require('../schema');
const { rootResolver } = require('../resolver');

module.exports = {
  createListener(store) {
    ipcMain.on(CREATE_USER, (event, query) => {
      graphql(schema, query, rootResolver)
        .then(payload => {
          if (!Array.isArray(payload.error)) {
            store.set('user', { username: payload.data.createUser.username });
          }
          return event.sender.send(RECEIVE_USER, payload);
        })
        .catch(err => event.sender.send(RECEIVE_USER, err));
    });
    ipcMain.on(CREATE_IMAGE, (event, query) => {
      graphql(schema, query, rootResolver)
        .then(payload => event.sender.send(RECEIVE_IMAGE, payload))
        .catch(err => event.sender.send(RECEIVE_IMAGE, err));
    });
  }
};
