const { ipcMain } = require('electron');
const {
  ACTION,
  TYPE
} = require('@doombox/utils');

const { handleErrorIpc } = require('../utils');

const useLibraryRouter = Controller => {
  ipcMain.on(TYPE.IPC.LIBRARY, (event, payload) => {
    switch (payload.action) {
      case ACTION.CRUD.CREATE:
        return Controller.create(event, payload);
      case ACTION.CRUD.READ:
        return Controller.read(event, payload);
      default:
        return handleErrorIpc({
          event,
          type: TYPE.IPC.LIBRARY,
          err: new Error(`Invalid action: ${payload.action}`)
        });
    }
  });
};

module.exports = {
  useLibraryRouter
};
