const { ipcMain } = require('electron');
const mongoose = require('mongoose');

// Types
const {
  CREATE_CONNECTION,
  GET_CONNECTION_CACHE
} = require('@doombox/utils/types/systemTypes');
const {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} = require('@doombox/utils/types/asyncTypes');

module.exports = {
  systemListener(store) {
    ipcMain.on(asyncActionPending(GET_CONNECTION_CACHE), event => {
      mongoose.disconnect()
        .then(() => {
          const user = store.get('user');

          if (!user || !user.connection) {
            event.sender.send(asyncActionError(GET_CONNECTION_CACHE));
          } else {
            mongoose.connect(user.connection, { useNewUrlParser: true })
              .then(() => {
                event.sender.send(asyncActionSuccess(GET_CONNECTION_CACHE));
              })
              .catch(err => {
                event.sender.send(asyncActionError(GET_CONNECTION_CACHE), err);
              });
          }
        })
        .catch(err => { throw err; });
    });
    ipcMain.on(asyncActionPending(CREATE_CONNECTION), (event, url) => {
      mongoose.disconnect()
        .then(() => {
          mongoose.connect(url, { useNewUrlParser: true })
            .then(() => {
              event.sender.send(asyncActionSuccess(CREATE_CONNECTION));
            })
            .catch(err => {
              event.sender.send(asyncActionError(CREATE_CONNECTION), err);
            });
        })
        .catch(err => { throw err; });
    });
  }
};
