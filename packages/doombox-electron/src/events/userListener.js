const { ipcMain } = require('electron');

// Types
const { CREATE_USER } = require('@doombox/utils/types/userTypes');
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
        const { username } = payload;

        const user = await User.findOne({ username }).lean();
        if (user) {
          event.sender.send(asyncActionError(CREATE_USER), {
            message: 'validation:userExists'
          });
        } else {
          await User.create({ ...payload });
          const newUser = await User.findOne({ username }).populate('avatar').lean();

          event.sender.send(asyncActionSuccess(CREATE_USER), {
            ...newUser,
            avatar: newUser.avatar ? newUser.avatar.path : null
          });
        }
      } catch (err) {
        event.sender.send(asyncActionError(CREATE_USER), err);
      }
    });
  }
};
