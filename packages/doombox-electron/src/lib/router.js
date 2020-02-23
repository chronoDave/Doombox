const { ipcMain } = require('electron');
const {
  TYPE,
  ACTION
} = require('@doombox/utils');

// Utils
const { createQueryRegExp } = require('../utils');

const transformPayload = payload => {
  const { data: { regex, ...rest } } = payload;
  const validOperators = ['and', 'or', 'not'];

  if (!regex) return payload;

  // Validate
  if (!regex.operator || !validOperators.includes(regex.operator)) {
    throw new Error(`Invalid operator (not 'string'): ${regex.operator}`);
  }
  if (!Array.isArray(regex.expressions)) {
    throw new Error(`Invalid expressions (not 'array'): ${regex.expressions}`);
  }

  return ({
    ...payload,
    data: {
      ...rest,
      query: {
        [`$${regex.operator}`]: regex.expressions
          .map(createQueryRegExp)
      }
    }
  });
};

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
            Controller.read(event, transformPayload(payload));
            break;
          case ACTION.CRUD.READ_ONE:
            Controller.readOne(event, payload);
            break;
          case ACTION.CRUD.UPDATE:
            Controller.update(event, transformPayload(payload));
            break;
          case ACTION.CRUD.UPDATE_ONE:
            Controller.updateOne(event, payload);
            break;
          case ACTION.CRUD.DELETE:
            Controller.delete(event, transformPayload(payload));
            break;
          case ACTION.CRUD.DELETE_ONE:
            Controller.deleteOne(event, payload);
            break;
          case ACTION.CRUD.DROP:
            Controller.drop(event, payload);
            break;
          case ACTION.CRUD.COUNT:
            Controller.count(event, transformPayload(payload));
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
