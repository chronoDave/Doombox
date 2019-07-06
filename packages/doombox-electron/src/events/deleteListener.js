const { ipcMain } = require('electron');

// Types
const {
  RECEIVE_USER
} = require('../../../../utils/types/receive');
const {
  DELETE_USER
} = require('../../../../utils/types/delete');

module.exports = {
  deleteListener(store) {
    ipcMain.on(DELETE_USER, event => {
      store.delete('user');

      event.sender.send(RECEIVE_USER, {});
    });
  }
};
