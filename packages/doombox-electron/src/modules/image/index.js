const { ipcMain } = require('electron');

// Types
const { CREATE_IMAGE } = require('@doombox/utils/types/imageTypes');
const {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} = require('@doombox/utils/types/asyncTypes');

// Model
const Image = require('./imageModel');

module.exports = {
  imageListener() {
    ipcMain.on(asyncActionPending(CREATE_IMAGE), async (event, payload) => {
      try {
        const { path } = payload;

        const image = await Image.findOne({ path }).lean();
        if (image) {
          event.sender.send(asyncActionSuccess(CREATE_IMAGE), {
            ...image,
            _id: image._id.toString()
          });
        } else {
          const newImage = await new Image({ ...payload }).save();

          event.sender.send(asyncActionSuccess(CREATE_IMAGE), {
            ...newImage._doc,
            _id: newImage._doc._id.toString()
          });
        }
      } catch (err) {
        event.sender.send(asyncActionError(CREATE_IMAGE), {
          payload: err
        });
      }
    });
  },
  imageCleanup() {
    ipcMain.removeAllListeners([
      asyncActionPending(CREATE_IMAGE)
    ]);
  }
};
