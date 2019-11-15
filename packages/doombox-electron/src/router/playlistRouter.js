const { ipcMain } = require('electron');

// Types
const {
  createType,
  PENDING,
  SUCCESS,
  ERROR,
  CREATE,
  READ,
  UPDATE,
  DELETE,
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
        JSON.stringify(err)
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
        JSON.stringify(err)
      )
    }, _id);
  });
  ipcMain.on(createType([PENDING, UPDATE, PLAYLIST]), (event, _id, modifiers) => {
    Controller.updateOneWithId({
      handleSuccess: doc => event.sender.send(
        createType([SUCCESS, UPDATE, PLAYLIST]),
        doc
      ),
      handleError: err => event.sender.send(
        createType([ERROR, UPDATE, PLAYLIST]),
        JSON.stringify(err)
      )
    }, _id, modifiers);
  });
  ipcMain.on(createType([PENDING, DELETE, PLAYLIST]), (event, _id) => {
    Controller.deleteOneWithId({
      handleSuccess: () => event.sender.send(
        createType([SUCCESS, DELETE, PLAYLIST])
      ),
      handleError: err => event.sender.send(
        createType([ERROR, DELETE, PLAYLIST]),
        JSON.stringify(err)
      )
    }, _id);
  });
};

module.exports = playlistRouter;
