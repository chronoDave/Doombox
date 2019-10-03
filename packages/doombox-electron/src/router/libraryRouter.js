const { ipcMain } = require('electron');

// Types
const {
  createType,
  LIBRARY,
  PENDING,
  ERROR,
  SUCCESS,
  COLLECTION,
  MESSAGE,
  SONG,
  DELETE,
  CREATE,
  READ,
} = require('@doombox/utils/types');

// Controllers
const libraryController = require('../controller/libraryController');

const libraryRouter = ({ db, store, parser }) => {
  // Library
  ipcMain.on(createType([PENDING, CREATE, LIBRARY]), (event, payload) => {
    const handleError = err => {
      event.sender.send(createType([ERROR, CREATE, LIBRARY]), err);
    };
    const handleSuccess = docs => {
      event.sender.send(createType([SUCCESS, CREATE, LIBRARY]), docs);
    };
    const handleMessage = message => {
      event.sender.send(createType([MESSAGE]), message);
    };

    libraryController.scan({
      store,
      event: {
        handleError,
        handleSuccess,
        handleMessage,
      },
      payload,
      parser,
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
      event.sender.send(createType([ERROR, READ, LIBRARY]), err);
    }
  });
  ipcMain.on(createType([PENDING, DELETE, LIBRARY]), async event => {
    try {
      await db.drop('library');
      event.sender.send(createType([SUCCESS, DELETE, LIBRARY]));
    } catch (err) {
      event.sender.send(createType([ERROR, DELETE, LIBRARY]), err);
    }
  });
  // Song
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
  // Collection
  ipcMain.on(createType([PENDING, READ, COLLECTION]), (event, payload) => {
    const handleSuccess = docs => {
      event.sender.send(createType([SUCCESS, READ, COLLECTION]), docs);
    };
    libraryController.group({ db, handleSuccess, payload });
  });
};

module.exports = {
  libraryRouter
};
