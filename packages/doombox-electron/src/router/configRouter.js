const { ipcMain } = require('electron');
const {
  ACTION,
  TYPE
} = require('@doombox/utils');

const useConfigRouter = Controller => {
  ipcMain.on(TYPE.IPC.CONFIG, (event, payload) => {
    switch (payload.action) {
      case ACTION.CRUD.READ:
        return Controller.read(event, payload);
      case ACTION.CRUD.UPDATE:
        return Controller.update(event, payload);
      default:
        throw new Error(`Invalid action: ${payload.action}`);
    }
  });
};

module.exports = {
  useConfigRouter
};
