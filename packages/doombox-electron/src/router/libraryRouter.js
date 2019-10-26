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
  ipcMain.on(createType([PENDING, CREATE, LIBRARY]), (event, paths) => {
    Controller.create({
      handleError: err => event.sender.send(
        createType([ERROR, CREATE, LIBRARY]),
        { message: err.name || 'An unknown error has occured' }
      ),
      handleSuccess: docs => event.sender.send(
        createType([SUCCESS, CREATE, LIBRARY]),
        docs
      ),
      handleMessage: message => event.sender.send(MESSAGE, message)
    }, paths);
  });

  ipcMain.on(createType([PENDING, READ, LIBRARY]), (event, query) => {
    Controller.read({
      handleSuccess: docs => event.sender.send(
        createType([SUCCESS, READ, LIBRARY]),
        docs
      ),
      handleError: err => event.sender.send(
        createType([ERROR, READ, LIBRARY]),
        { message: err.name || 'An unknown error has occured' }
      )
    }, query);
  });

  ipcMain.on(createType([PENDING, DELETE, LIBRARY]), event => {
    Controller.delete({
      handleSuccess: () => event.sender.send(
        createType([SUCCESS, DELETE, LIBRARY])
      ),
      handleError: err => event.sender.send(
        createType([ERROR, DELETE, LIBRARY]),
        { message: err.name || 'An unknown error has occurred' }
      )
    });
  });

  ipcMain.on(createType([PENDING, READ, SONG]), (event, _id) => {
    Controller.readOneWithId({
      handleSuccess: doc => event.sender.send(
        createType([SUCCESS, READ, SONG]),
        doc
      ),
      handleError: err => event.sender.send(
        createType([ERROR, READ, SONG]),
        { message: err.name || 'An unknown error has occurred' }
      )
    }, _id);
  });
};

module.exports = libraryRouter;
