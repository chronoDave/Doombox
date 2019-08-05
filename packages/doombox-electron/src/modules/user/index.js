const { ipcMain } = require('electron');

// Types
const {
  ERROR,
  PENDING
} = require('@doombox/utils/types/asyncTypes');
const {
  READ
} = require('@doombox/utils/types/crudTypes');
const {
  create,
  USER_CACHE
} = require('@doombox/utils/types');

// Controllers
const mongooseController = require('../system/controllers/mongooseController');
const nedbController = require('../system/controllers/nedbController');

const userRouter = store => {
  ipcMain.on(create([PENDING, READ, USER_CACHE]), event => {
    const connection = store.get('connection');
    const user = store.get('user');

    if (user._id) {
      nedbController.getProfile({
        ipcEvent: { event, type: USER_CACHE },
        collection: 'users',
        args: { _id: user._id }
      });
    } else {
      event.sender.send(create([ERROR, READ, USER_CACHE]));
    }

    if (connection.remote) {
      mongooseController.connect(event, connection.path);
    }
  });
};

const userCleanup = () => {
  ipcMain.removeAllListeners([
    create([PENDING, READ, USER_CACHE])
  ]);
};

module.exports = {
  userRouter,
  userCleanup
};
