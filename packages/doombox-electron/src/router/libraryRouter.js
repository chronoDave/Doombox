const { ipcMain } = require('electron');

// Types
const {
  createType,
  LIBRARY,
  PENDING,
  ERROR,
  SUCCESS,
  MESSAGE,
  SONG,
  DELETE,
  CREATE,
  READ,
} = require('@doombox/utils/types');

const libraryRouter = Controller => {
  ipcMain.on(createType([PENDING, CREATE, LIBRARY]), (event, payload) => {
    Controller.create({
      handleError: err => event.sender.send(createType([ERROR, CREATE, LIBRARY]), err),
      handleSuccess: docs => event.sender.send(createType([SUCCESS, CREATE, LIBRARY]), docs),
      handleMessage: message => event.sender.send(MESSAGE, message)
    }, payload);
  });

  ipcMain.on(createType([PENDING, READ, LIBRARY]), (event, payload) => {
    Controller.read({
      handleSuccess: docs => event.sender.send(createType([SUCCESS, READ, LIBRARY]), docs)
    }, payload);
  });

  ipcMain.on(createType([PENDING, DELETE, LIBRARY]), event => {
    Controller.delete({
      handleSuccess: () => event.sender.send(createType([SUCCESS, DELETE, LIBRARY]))
    });
  });

  ipcMain.on(createType([PENDING, READ, SONG]), (event, _id) => {
    Controller.readOne({
      handleSuccess: doc => event.sender.send(createType([SUCCESS, READ, SONG]), doc)
    }, _id);
  });
};

module.exports = libraryRouter;
