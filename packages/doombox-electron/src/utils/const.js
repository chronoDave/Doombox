const { app } = require('electron');
const path = require('path');

module.exports = {
  PATH: {
    LOG: path.resolve(app.getPath('userData'), 'logs'),
    IMAGE: path.resolve(app.getPath('userData'), 'images')
  },
  COLLECTION: {
    IMAGE: 'images',
    SONG: 'songs'
  }
};
