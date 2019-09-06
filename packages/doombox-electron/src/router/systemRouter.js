const { ipcMain } = require('electron');
const mongoose = require('mongoose');

// Types
const {
  createType,
  PENDING,
  CONNECTION,
  ERROR,
  READ,
  CACHE,
} = require('@doombox/utils/types');

// Controller
const userController = require('../controller/userController');

const systemRouter = ({ db, store }) => {
  ipcMain.on(createType([PENDING, READ, CACHE]), async (event, payload) => {
    const { _id, remote } = store.get('user');
    const offline = payload ? payload.offline : false;

    if (!_id) {
      event.sender.send(
        createType([ERROR, READ, CACHE]),
        { message: 'error:cache_none' }
      );
    } else if (remote && !offline) {
      try {
        await mongoose.connect(remote, { useNewUrlParser: true });
        userController.findById({ _id, remote, event });
      } catch (err) {
        event.sender.send(
          createType([ERROR, READ, CONNECTION]),
          { message: 'error:remote_offline' }
        );
      }
    } else {
      userController.findById(({ _id, db, event }));
    }
  });
};

module.exports = {
  systemRouter
};
