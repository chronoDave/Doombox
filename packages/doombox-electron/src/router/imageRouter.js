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

const imageRouter = ({ db }) => {
  ipcMain.on(createType([PENDING, READ, IMAGE]), async (event, _id) => {
    try {
      const doc = await db.readOne({
        collection: 'images',
        query: { _id }
      });
      event.sender.send(createType([SUCCESS, READ, IMAGE]), doc);
    } catch (err) {
      event.sender.send(createType([ERROR, READ, IMAGE]), err);
    }
  });
};

module.exports = {
  imageRouter
};
