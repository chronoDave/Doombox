const { ipcMain } = require('electron');

// Types
const {
  FETCH_CACHED_USER
} = require('@doombox/utils/types/fetch');
const {
  RECEIVE_CACHED_USER
} = require('@doombox/utils/types/receive');

module.exports = {
  cacheListener(store) {
    ipcMain.on(FETCH_CACHED_USER, event => {
      const user = store.get('user');
      event.sender.send(RECEIVE_CACHED_USER, user);
    });
  }
};
