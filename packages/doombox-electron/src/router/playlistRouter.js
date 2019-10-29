const { ipcMain } = require('electron');

// Types
const {
  createType,
  PENDING,
  SUCCESS,
  ERROR,
  CREATE,
  READ,
  PLAYLIST
} = require('@doombox/utils/types/ipc');

const playlistRouter = Controller => {
  ipcMain.on(createType([PENDING, CREATE, PLAYLIST]), (event, playlist) => {
    Controller.createOne({
      handleSuccess: doc => event.sender.send(
        createType([SUCCESS, CREATE, PLAYLIST]),
        doc
      ),
      handleError: err => event.sender.send(
        createType([ERROR, CREATE, PLAYLIST]),
        err.toString()
      )
    }, playlist);
  });
  ipcMain.on(createType([PENDING, READ, PLAYLIST]), (event, _id) => {
    Controller.read({
      handleSuccess: doc => event.sender.send(
        createType([SUCCESS, READ, PLAYLIST]),
        doc
      ),
      handleError: err => event.sender.send(
        createType([ERROR, READ, PLAYLIST]),
        err.toString()
      )
    }, _id);
  });
};

module.exports = playlistRouter;
