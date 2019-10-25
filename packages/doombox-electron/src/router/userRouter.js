const { ipcMain } = require('electron');

const {
  createType,
  PENDING,
  SUCCESS,
  ERROR,
  CREATE,
  READ,
  UPDATE,
  DELETE,
  USER,
  CACHE
} = require('@doombox/utils/types');

const userRouter = Controller => {
  ipcMain.on(createType([PENDING, CREATE, USER]), (event, payload) => {
    Controller.create({
      handleSuccess: doc => event.sender.send(createType([SUCCESS, CREATE, USER]), doc)
    }, payload, true);
  });
  ipcMain.on(createType([PENDING, READ, CACHE]), event => {
    Controller.readCached({
      handleSuccess: doc => event.sender.send(createType([SUCCESS, READ, USER]), doc),
      handleError: () => event.sender.send(createType([ERROR, READ, CACHE]))
    });
  });
  ipcMain.on(createType([PENDING, UPDATE, USER]), (event, payload) => {
    Controller.update({
      handleSuccess: doc => event.sender.send(createType([SUCCESS, UPDATE, USER]), doc)
    }, payload);
  });
  ipcMain.on(createType([PENDING, DELETE, USER]), (event, _id) => {
    Controller.delete({
      handleSuccess: () => event.sender.send(createType([SUCCESS, DELETE, USER]))
    }, _id);
  });
};

module.exports = userRouter;
