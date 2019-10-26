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
  ipcMain.on(createType([PENDING, CREATE, USER]), (event, user) => {
    Controller.createOne({
      handleSuccess: doc => event.sender.send(
        createType([SUCCESS, CREATE, USER]),
        doc
      ),
      handleError: err => event.sender.send(
        createType([ERROR, CREATE, USER]),
        { message: err.name || 'An unknown error has occurred' }
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
        { message: err.name || 'An unknown error has occurred' }
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
        { message: err.name || 'An unknown error has occurred' }
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
        { message: err.name | 'An unknown error has occurred' }
      )
    }, _id);
  });
};

module.exports = userRouter;
