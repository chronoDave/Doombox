const { app } = require('electron');
const path = require('path');

module.exports = {
  PATH: {
    DATABASE: path.resolve(app.getPath('userData'), 'nedb'),
    LOG: path.resolve(app.getPath('userData'), 'logs'),
    IMAGE: path.resolve(app.getPath('userData'), 'images')
  },
  COLLECTION: {
    USER: 'users',
    IMAGE: 'images',
    SONG: 'songs',
    PLAYLIST: 'playlist'
  }
};
