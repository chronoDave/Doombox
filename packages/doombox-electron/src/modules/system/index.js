const { ipcMain } = require('electron');

// Types
const {
  PENDING
} = require('@doombox/utils/types/asyncTypes');
const {
  READ
} = require('@doombox/utils/types/crudTypes');
const {
  create,
  CONNECTION_CACHE
} = require('@doombox/utils/types');

// Controllers
const mongooseController = require('./controllers/mongooseController');

const systemRouter = store => {
  ipcMain.on(create([PENDING, READ, CONNECTION_CACHE]), event => {
    const connection = store.get('connection');

    return null; // TODO
    // return mongooseController.connect(event, connection.path);
  });
};

const systemCleanup = () => {
  ipcMain.removeAllListeners([
    create([PENDING, READ, CONNECTION_CACHE])
  ]);
};

module.exports = {
  systemRouter,
  systemCleanup
};
