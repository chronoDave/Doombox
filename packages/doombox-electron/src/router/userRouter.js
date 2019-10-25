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
  USER
} = require('@doombox/utils/types');

const userRouter = Controller => {
  ipcMain.on(createType([PENDING, CREATE, USER]), (event, payload) => {
    Controller.create({
      handleSuccess: doc => event.sender.send(createType([SUCCESS, CREATE, USER]), doc)
    }, payload, true);
  });
  ipcMain.on(createType([PENDING, READ, USER]), (event, payload) => {
    Controller.readOne({
      handleSuccess: doc => event.sender.send(createType([SUCCESS, READ, USER]), doc),
      handleError: err => event.sender.send(createType([ERROR, READ, USER]), err)
    }, payload);
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
