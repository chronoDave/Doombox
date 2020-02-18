const { ipcMain } = require('electron');
const {
  TYPE,
  ACTION
} = require('@doombox/utils');

module.exports = class Router {
  /**
   * @param {Logger} logger
   */
  constructor(logger) {
    this.log = logger;
  }

  /**
   * @param {String} type - Ipc type
   * @param {Controller} Controller
   */
  createRouter(type, Controller) {
    ipcMain.on(type, (event, payload) => {
      try {
        switch (payload.action) {
          case ACTION.CRUD.CREATE:
            Controller.create(event, payload);
            break;
          case ACTION.CRUD.READ:
            Controller.read(event, payload);
            break;
          case ACTION.CRUD.READ_ONE:
            Controller.readOne(event, payload);
            break;
          case ACTION.CRUD.UPDATE:
            Controller.update(event, payload);
            break;
          case ACTION.CRUD.UPDATE_ONE:
            Controller.updateOne(event, payload);
            break;
          case ACTION.CRUD.DELETE:
            Controller.delete(event, payload);
            break;
          case ACTION.CRUD.DELETE_ONE:
            Controller.deleteOne(event, payload);
            break;
          case ACTION.CRUD.DROP:
            Controller.drop(event, payload);
            break;
          case ACTION.CRUD.COUNT:
            Controller.count(event, payload);
            break;
          default:
            throw new Error(`Invalid action: ${payload.action}`);
        }
      } catch (err) {
        this.log.createLogError(err, 'Router', errJson => {
          event.sender.send(TYPE.IPC.MESSAGE, { err: errJson });
          event.sender.send(TYPE.IPC.INTERRUPT, { type, status: ACTION.STATUS.ERROR });
        });
      }
    });
  }
};
