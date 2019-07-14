const { ipcMain } = require('electron');

// Types
const {
  DELETE_USER,
  UPDATE_USER,
  CREATE_USER,
  GET_USER_CACHE
} = require('@doombox/utils/types/userTypes');
const {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} = require('@doombox/utils/types/asyncTypes');

// Model
const User = require('../models/user');

module.exports = {
  userListener(store) {
    ipcMain.on(asyncActionPending(CREATE_USER), async (event, payload) => {
      try {
        const user = await User.create({ ...payload });
        const newUser = await User
          .findById(user._doc._id)
          .populate('avatar')
          .lean();

        // Cache user
        store.set('user', newUser._id);

        event.sender.send(asyncActionSuccess(CREATE_USER), {
          ...newUser,
          _id: newUser._id.toString()
        });
      } catch (err) {
        event.sender.send(asyncActionError(CREATE_USER), err);
      }
    });
    ipcMain.on(asyncActionPending(GET_USER_CACHE), async event => {
      try {
        const cachedId = store.get('user');

        if (cachedId) {
          const user = await User
            .findById(cachedId)
            .populate('avatar')
            .populate('background')
            .lean();

          event.sender.send(asyncActionSuccess(GET_USER_CACHE), {
            ...user,
            _id: user._id.toString()
          });
        } else {
          event.sender.send(asyncActionError(GET_USER_CACHE));
        }
      } catch (err) {
        event.sender.send(asyncActionError(GET_USER_CACHE, err));
      }
    });
    ipcMain.on(asyncActionPending(UPDATE_USER), async (event, payload) => {
      try {
        const { id, values } = payload;

        await User.findOneAndUpdate({ _id: id }, { ...values });
        const newUser = await User.findById(id)
          .populate('avatar')
          .populate('background')
          .lean();

        event.sender.send(asyncActionSuccess(UPDATE_USER), {
          ...newUser,
          _id: newUser._id.toString()
        });
      } catch (err) {
        event.sender.send(asyncActionError(UPDATE_USER), err);
      }
    });
    ipcMain.on(asyncActionPending(DELETE_USER), async (event, _id) => {
      try {
        await User.deleteOne({ _id });
        event.sender.send(asyncActionSuccess(DELETE_USER), null);
      } catch (err) {
        event.sender.send(asyncActionError(DELETE_USER), err);
      }
    });
  }
};
