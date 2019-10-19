const { ipcMain } = require('electron');

const {
  createType,
  PENDING,
  ERROR,
  SUCCESS,
  CREATE,
  UPDATE,
  DELETE,
  USER
} = require('@doombox/utils/types');

const userRouter = ({ db, store }) => {
  ipcMain.on(createType([PENDING, CREATE, USER]), async (event, payload) => {
    try {
      const doc = await db.create('users', payload);

      const user = store.get('user');
      store.set('user', { ...user, _id: doc._id });

      event.sender.send(createType([SUCCESS, CREATE, USER]), doc);
    } catch (err) {
      event.sender.send(createType([ERROR, CREATE, USER]));
    }
  });
  ipcMain.on(
    createType([PENDING, UPDATE, USER]),
    async (event, { _id, ...rest }) => {
      try {
        await db.update('users', _id, { $set: { ...rest } });
        const doc = await db.readOne('users', { query: { _id } });

        event.sender.send(createType([SUCCESS, UPDATE, USER]), doc);
      } catch (err) {
        event.sender.send(createType([ERROR, UPDATE, USER]));
      }
    }
  );
  ipcMain.on(createType([PENDING, DELETE, USER]), async (event, _id) => {
    try {
      await db.delete('users', _id);

      store.set('user', {});

      event.sender.send(createType([SUCCESS, DELETE, USER]));
    } catch (err) {
      event.sender.send(createType([ERROR, DELETE, USER]), err);
    }
  });
};

module.exports = {
  userRouter
};
