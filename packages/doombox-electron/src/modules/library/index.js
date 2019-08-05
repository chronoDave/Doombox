const { ipcMain } = require('electron');

// Types
const {
  PENDING
} = require('@doombox/utils/types/asyncTypes');
const {
  CREATE
} = require('@doombox/utils/types/crudTypes');
const {
  create,
  LIBRARY
} = require('@doombox/utils/types');

// Controllers
const libraryController = require('./controllers/libraryController');

const libraryRouter = () => {
  ipcMain.on(create([PENDING, CREATE, LIBRARY]), (event, payload) => {
    libraryController.scan(event, payload);
  });
};

const libraryCleanup = () => {
  ipcMain.removeAllListeners([
    create([PENDING, CREATE, LIBRARY])
  ]);
};

module.exports = {
  libraryRouter,
  libraryCleanup
};
