const { ipcMain } = require('electron');

// Types
const {
  createType,
  LIBRARY,
  PENDING,
  ERROR,
  SUCCESS,
  SONG,
  CREATE,
  READ,
} = require('@doombox/utils/types');

// Controllers
const libraryController = require('../controller/libraryController');

const libraryRouter = ({ db, store }) => {
  ipcMain.on(createType([PENDING, CREATE, LIBRARY]), (event, payload) => {
    libraryController.scan({
      store,
      event,
      payload,
      db
    });
  });
  ipcMain.on(createType([PENDING, READ, LIBRARY]), async event => {
    try {
      const docs = await db.read({
        collection: 'library',
        projection: { path: 1, APIC: 1 }
      });
      event.sender.send(createType([SUCCESS, READ, LIBRARY]), docs);
    } catch (err) {
      event.sender.send(createType([ERROR, READ, LIBRARY]));
    }
  });

  ipcMain.on(createType([PENDING, READ, SONG]), async (event, _id) => {
    try {
      const docs = await db.readOne({
        collection: 'library',
        query: { _id },
        projection: { path: 0, _id: 0 }
      });
      event.sender.send(createType([SUCCESS, READ, SONG]), docs);
    } catch (err) {
      event.sender.send(createType([ERROR, READ, SONG]));
    }
  });
};

module.exports = {
  libraryRouter
};
