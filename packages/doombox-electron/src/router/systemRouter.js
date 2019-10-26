const { ipcMain } = require('electron');

// Types
const {
  createType,
  PENDING,
  SUCCESS,
  ERROR,
  READ,
  CACHE
} = require('@doombox/utils/types');

const systemRouter = Controller => {
  ipcMain.on(createType([PENDING, READ, CACHE]), event => {
    Controller.readCache({
      handleSuccess: doc => event.sender.send(
        createType([SUCCESS, READ, CACHE]),
        doc
      ),
      handleError: err => event.sender.send(
        createType([ERROR, READ, CACHE]),
        { message: err.name || 'An unknown error has occurred' }
      )
    }, 'user');
  });
};

module.exports = systemRouter;
