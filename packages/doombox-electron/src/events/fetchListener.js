const { ipcMain } = require('electron');

// Types
const {
  FETCH_USER
} = require('../../../../utils/types/fetch');
const {
  RECEIVE_USER
} = require('../../../../utils/types/receive');

module.exports = {
  fetchListener(store) {
    ipcMain.on(FETCH_USER, event => {
      const user = store.get('user');
      event.sender.send(RECEIVE_USER, user);
    });
  }
};
