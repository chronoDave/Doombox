const { app } = require('electron');
const path = require('path');

module.exports = {
  PATH: {
    CONFIG: app.getPath('userData'),
    DATABASE: path.resolve(app.getPath('userData'), 'nedb'),
    LOG: path.resolve(app.getPath('userData'), 'logs'),
    IMAGE: path.resolve(app.getPath('userData'), 'images')
  }
};
