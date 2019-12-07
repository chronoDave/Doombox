const { ipcMain } = require('electron');
const {
  ACTION,
  TYPE
} = require('@doombox/utils');

const { handleErrorIpc } = require('../utils');

const useConfigRouter = Controller => {
  ipcMain.on(TYPE.IPC.CONFIG, (event, payload) => {
    switch (payload.action) {
      case ACTION.CRUD.READ:
        return Controller.read(event, payload);
      default:
        return handleErrorIpc({
          event,
          type: TYPE.IPC.CONFIG,
          err: new Error(`Invalid action: ${payload.action}`)
        });
    }
  });
};

module.exports = {
  useConfigRouter
};
