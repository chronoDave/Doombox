const { ipcMain } = require('electron');
const mongoose = require('mongoose');

// Types
const {
  CREATE_CONNECTION,
  UPDATE_CONNECTION,
  GET_CONNECTION_CACHE
} = require('@doombox/utils/types/systemTypes');
const {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} = require('@doombox/utils/types/asyncTypes');

// Model
const User = require('../models/user');

module.exports = {
  systemListener(store) {
    ipcMain.on(asyncActionPending(GET_CONNECTION_CACHE), async event => {
      const user = store.get('user');
      try {
        await mongoose.disconnect();
        await mongoose.connect(user.connection, { useNewUrlParser: true });
        mongoose.set('useFindAndModify', false);

        event.sender.send(asyncActionSuccess(GET_CONNECTION_CACHE));
      } catch (err) {
        event.sender.send(asyncActionError(GET_CONNECTION_CACHE), {
          ...err,
          address: user.connection
        });
      }
    });
    ipcMain.on(asyncActionPending(CREATE_CONNECTION), async (event, url) => {
      try {
        await mongoose.disconnect();
        await mongoose.connect(url, { useNewUrlParser: true });
        mongoose.set('useFindAndModify', false);

        event.sender.send(asyncActionSuccess(CREATE_CONNECTION));
      } catch (err) {
        event.sender.send(asyncActionError(CREATE_CONNECTION), err);
      }
    });
    ipcMain.on(asyncActionPending(UPDATE_CONNECTION), async (event, url) => {
      try {
        await mongoose.disconnect();
        await mongoose.connect(url, { useNewUrlParser: true });
        mongoose.set('useFindAndModify', false);

        const user = store.get('user');
        await User.findByIdAndUpdate(user.id, { connection: url });
        store.set('user', { ...user, connection: url });

        event.sender.send(asyncActionSuccess(UPDATE_CONNECTION));
      } catch (err) {
        event.sender.send(asyncActionError(UPDATE_CONNECTION));
      }
    });
  }
};
