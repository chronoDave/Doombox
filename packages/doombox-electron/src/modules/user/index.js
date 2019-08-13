const { ipcMain } = require('electron');

// Types
const {
  ERROR,
  PENDING,
  SUCCESS
} = require('@doombox/utils/types/asyncTypes');
const {
  CREATE,
  READ,
  UPDATE,
  DELETE
} = require('@doombox/utils/types/crudTypes');
const {
  create,
  USER,
  USER_CACHE
} = require('@doombox/utils/types');

// Database
const NeDB = require('../../lib/database/nedb');

const localDatabase = new NeDB();

const userRouter = store => {
  ipcMain.on(create([PENDING, CREATE, USER]), async (event, payload) => {
    try {
      const doc = await localDatabase.create('users', payload);

      const user = store.get('user');
      store.set('user', { ...user, _id: doc._id });

      event.sender.send(create([SUCCESS, CREATE, USER]), doc);
    } catch (err) {
      event.sender.send(create([ERROR, CREATE, USER]), err);
    }
  });
  ipcMain.on(create([PENDING, READ, USER_CACHE]), async event => {
    const user = store.get('user');

    if (user._id) {
      try {
        const doc = await localDatabase.readOne('users', { _id: user._id });
        event.sender.send(create([SUCCESS, READ, USER_CACHE]), doc);
      } catch (err) {
        event.sender.send(create([ERROR, READ, USER_CACHE]), err);
      }
    } else {
      event.sender.send(create([ERROR, READ, USER_CACHE]));
    }
  });
  ipcMain.on(create([PENDING, UPDATE, USER]), async (event, { _id, ...rest }) => {
    try {
      await localDatabase.update('users', _id, { $set: { ...rest } });
      const doc = await localDatabase.readOne('users', { _id });

      event.sender.send(create([SUCCESS, UPDATE, USER]), doc);
    } catch (err) {
      event.sender.send(create([ERROR, UPDATE, USER]));
    }
  });
  ipcMain.on(create([PENDING, DELETE, USER]), async (event, _id) => {
    try {
      await localDatabase.delete('users', _id);
      event.sender.send(create([SUCCESS, DELETE, USER]));
    } catch (err) {
      event.sender.send(create([ERROR, DELETE, USER]));
    }
  });
};

const userCleanup = () => {
  ipcMain.removeAllListeners([
    create([PENDING, CREATE, USER]),
    create([PENDING, READ, USER_CACHE]),
    create([PENDING, UPDATE, USER]),
    create([PENDING, DELETE, USER]),
  ]);
};

module.exports = {
  userRouter,
  userCleanup
};
