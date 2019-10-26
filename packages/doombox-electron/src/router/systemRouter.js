const { ipcMain } = require('electron');

// Types
const {
  createType,
  PENDING,
  SUCCESS,
  ERROR,
  READ,
  CACHE
} = require('@doombox/utils/types/ipc');

const systemRouter = Controller => {
  ipcMain.on(createType([PENDING, READ, CACHE]), event => {
    Controller.readCache({
      handleSuccess: doc => event.sender.send(
        createType([SUCCESS, READ, CACHE]),
        doc
      ),
      handleError: () => event.sender.send(
        createType([ERROR, READ, CACHE]),
        { message: 'No cached user found' }
      )
    });
  });
};

module.exports = systemRouter;
