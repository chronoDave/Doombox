const { ipcMain } = require('electron');
const { graphql } = require('graphql');

// Core
const { schema } = require('../schema');
const { rootResolver } = require('../resolver');

// Types
const {
  CREATE_USER,
  CREATE_IMAGE
} = require('../../../../utils/types/create');
const {
  RECEIVE_USER,
  RECEIVE_IMAGE
} = require('../../../../utils/types/receive');

module.exports = {
  createListener(store) {
    ipcMain.on(CREATE_USER, (event, query) => {
      graphql(schema, query, rootResolver)
        .then(payload => {
          if (Array.isArray(payload.error)) {
            store.set('user', { _id: payload.data.createUser._id });
          }
          return event.sender.send(RECEIVE_USER, payload);
        })
        .catch(err => {
          return event.sender.send(RECEIVE_USER, err);
        });
    });
    ipcMain.on(CREATE_IMAGE, (event, query) => {
      graphql(schema, query, rootResolver)
        .then(payload => event.sender.send(RECEIVE_IMAGE, payload))
        .catch(err => event.sender.send(RECEIVE_IMAGE, err));
    });
  }
};
