const { ipcMain } = require('electron');

// Types
const {
  CREATE_USER,
} = require('../../../../utils/types/create');
const {
  RECEIVE_USER
} = require('../../../../utils/types/receive');

module.exports = {
  createListener(store) {
    ipcMain.on(CREATE_USER, (event, payload) => {
      store.set('user', { ...payload });

      const newUser = store.get('user');
      event.sender.send(RECEIVE_USER, newUser);
    });
  }
};
