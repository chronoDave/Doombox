const { ipcMain } = require('electron');
const fs = require('fs');

// Types
const {
  ERROR,
  PENDING,
  SUCCESS
} = require('@doombox/utils/types/asyncTypes');
const { READ } = require('@doombox/utils/types/crudTypes');
const {
  create,
  IMAGE,
} = require('@doombox/utils/types');

// Controller
const nedbController = require('../system/controllers/nebdController');

const imageRouter = () => {
  ipcMain.on(create([PENDING, READ, IMAGE]), async (event, _id) => {
    try {
      const doc = await nedbController.readOne('images', { _id });
      event.sender.send(create([SUCCESS, READ, IMAGE]), doc);
    } catch (err) {
      event.sender.send(create([ERROR, READ, IMAGE]), err);
    }
  });
};

const imageCleanup = () => {
  ipcMain.removeAllListeners([
    create([PENDING, READ, IMAGE]),
    create([SUCCESS, READ, IMAGE]),
    create([ERROR, READ, IMAGE])
  ]);
};

module.exports = {
  imageRouter,
  imageCleanup
};
