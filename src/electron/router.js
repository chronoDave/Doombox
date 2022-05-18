const path = require('path');
const { ipcMain } = require('electron');

const { IPC } = require('@doombox-utils/types');

// Core
const Reporter = require('./reporter/reporter');

module.exports = class Router extends Reporter {
  constructor(root) {
    super(path.resolve(root, 'logs'));
  }

  bind(channel, Controller) {
    const routes = {
      [IPC.ACTION.INSERT]: Controller.insert,
      [IPC.ACTION.FIND]: Controller.find,
      [IPC.ACTION.FIND_BY_ID]: Controller.findById,
      [IPC.ACTION.UPDATE]: Controller.update,
      [IPC.ACTION.UPDATE_BY_ID]: Controller.updateById,
      [IPC.ACTION.DELETE]: Controller.delete,
      [IPC.ACTION.DELETE_BY_ID]: Controller.deleteById,
      [IPC.ACTION.DROP]: Controller.drop
    };

    ipcMain.on(channel, async (event, payload) => {
      try {
        if (!payload) {
          throw new Error(`No payload found: ${JSON.stringify(payload)}`);
        }
        if (!routes[payload.action]) {
          throw new Error(`Invalid action: ${JSON.stringify(payload.action)}`);
        }

        const data = await routes[payload.action](event, payload.data);
        event.sender.send(channel, data);
      } catch (error) {
        this.logError(error);
        event.sender.send(IPC.CHANNEL.ERROR, { channel, error });
      }
    });
  }
};
