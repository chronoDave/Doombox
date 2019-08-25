const { ipcMain } = require('electron');

// Types
const {
  create,
  LIBRARY,
  PENDING,
  ERROR,
  SUCCESS,
  CREATE,
  READ,
  COUNT
} = require('@doombox/utils/types');

// Controllers
const libraryController = require('./controllers/libraryController');
const nedbController = require('../system/controllers/nebdController');

const libraryRouter = () => {
  ipcMain.on(create([PENDING, CREATE, LIBRARY]), (event, payload) => {
    libraryController.scan(event, payload);
  });
  ipcMain.on(create([PENDING, READ, LIBRARY]), async (event, payload) => {
    try {
      const docs = await nedbController.read('library', payload);
      event.sender.send(create([SUCCESS, READ, LIBRARY]), docs);
    } catch (err) {
      event.sender.send(create([ERROR, READ, LIBRARY]), err);
    }
  });
  ipcMain.on(create([PENDING, COUNT, LIBRARY]), async (event, payload) => {
    try {
      const count = await nedbController.count('library', payload);
      event.sender.send(create([SUCCESS, COUNT, LIBRARY]), count);
    } catch (err) {
      event.sender.send(create([SUCCESS, COUNT, LIBRARY]), err);
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
