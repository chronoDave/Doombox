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
} = require('@doombox/utils/types/ipc');

const userRouter = Controller => {
  ipcMain.on(createType([PENDING, CREATE, USER]), (event, user) => {
    Controller.createOne({
      handleSuccess: doc => event.sender.send(
        createType([SUCCESS, CREATE, USER]),
        doc
      ),
      handleError: err => event.sender.send(
        createType([ERROR, CREATE, USER]),
        err.toString()
      )
    }, user);
  });
  ipcMain.on(createType([PENDING, READ, USER]), (event, _id) => {
    Controller.readOneWithId({
      handleSuccess: doc => event.sender.send(
        createType([SUCCESS, READ, USER]),
        doc
      ),
      handleError: err => event.sender.send(
        createType([ERROR, READ, USER]),
        err.toString()
      )
    }, _id);
  });
  ipcMain.on(createType([PENDING, UPDATE, USER]), (event, _id, modifiers) => {
    Controller.updateOneWithId({
      handleSuccess: doc => event.sender.send(
        createType([SUCCESS, UPDATE, USER]),
        doc
      ),
      handleError: err => event.sender.send(
        createType([ERROR, UPDATE, USER]),
        err.toString()
      )
    }, _id, modifiers);
  });
  ipcMain.on(createType([PENDING, DELETE, USER]), (event, _id) => {
    Controller.deleteOneWithId({
      handleSuccess: () => event.sender.send(
        createType([SUCCESS, DELETE, USER])
      ),
      handleError: err => event.sender.send(
        createType([ERROR, DELETE, USER]),
        err.toString()
      )
    }, _id);
  });
};

module.exports = userRouter;
