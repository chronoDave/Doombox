const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = class Logger {
  constructor() {
    const userDataPath = app.getPath('userData');
    const errorFolder = path.resolve(userDataPath, 'logs');

    mkdirp.sync(errorFolder);

    this.folder = errorFolder;
  }

  /**
   * @param {Object} err - An error object
   */
  createLog(err) {
    fs.writeFileSync(
      path.join(this.folder, `error_${new Date().getTime()}.txt`),
      `${err.name || 'Unknown error'}: ${err.message}\n${err.stack || 'No stack found'}`
    );
  }
};
