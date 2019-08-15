const { ipcMain } = require('electron');

// Types
const {
  PENDING,
  ERROR,
  SUCCESS
} = require('@doombox/utils/types/asyncTypes');
const {
  CREATE,
  READ
} = require('@doombox/utils/types/crudTypes');
const {
  create,
  LIBRARY
} = require('@doombox/utils/types');

// Controllers
const libraryController = require('./controllers/libraryController');
const nedbController = require('../system/controllers/nebdController');

const libraryRouter = () => {
  ipcMain.on(create([PENDING, CREATE, LIBRARY]), (event, payload) => {
    libraryController.scan(event, payload);
  });
  ipcMain.on(create([PENDING, READ, LIBRARY]), async event => {
    try {
      const docs = await nedbController.read('library');
      event.sender.send(create([SUCCESS, READ, LIBRARY]), docs);
    } catch (err) {
      event.sender.send(create([ERROR, READ, LIBRARY]), err);
    }
  });
};

const libraryCleanup = () => {
  ipcMain.removeAllListeners([
    create([PENDING, CREATE, LIBRARY]),
    create([PENDING, READ, LIBRARY]),
    create([SUCCESS, READ, LIBRARY]),
    create([ERROR, READ, LIBRARY]),
  ]);
};

module.exports = {
  libraryRouter,
  libraryCleanup
};
