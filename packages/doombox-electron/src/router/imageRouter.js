const { ipcMain } = require('electron');

// Types
const {
  createType,
  IMAGE,
  READ,
  ERROR,
  PENDING,
  SUCCESS
} = require('@doombox/utils/types');

const imageRouter = Controller => {
  ipcMain.on(createType([PENDING, READ, IMAGE]), (event, _id) => {
    Controller.readOneWithId({
      handleSuccess: doc => event.sender.send(createType([SUCCESS, READ, IMAGE]), doc),
      handleError: err => event.sender.send(createType([ERROR, READ, IMAGE]), err)
    }, _id);
  });
};

module.exports = imageRouter;
