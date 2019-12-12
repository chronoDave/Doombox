const { ipcMain } = require('electron');
const { ACTION } = require('@doombox/utils');

const createRouter = (type, Controller) => {
  ipcMain.on(type, (event, payload) => {
    switch (payload.action) {
      case ACTION.CRUD.CREATE:
        return Controller.create(event, payload);
      case ACTION.CRUD.READ:
        return Controller.read(event, payload);
      case ACTION.CRUD.READ_ONE:
        return Controller.readOne(event, payload);
      case ACTION.CRUD.UPDATE:
        return Controller.update(event, payload);
      case ACTION.CRUD.UPDATE_ONE:
        return Controller.updateOne(event, payload);
      case ACTION.CRUD.DELETE:
        return Controller.delete(event, payload);
      case ACTION.CRUD.DELETE_ONE:
        return Controller.deleteOne(event, payload);
      case ACTION.CRUD.DROP:
        return Controller.drop(event, payload);
      case ACTION.CRUD.COUNT:
        return Controller.count(event, payload);
      default:
        throw new Error(`Invalid action: ${payload.action}`);
    }
  });
};

module.exports = {
  createRouter
};
