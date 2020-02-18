const fse = require('fs-extra');
const path = require('path');

module.exports = class Logger {
  /**
   * @param {String} root - Root directory of the log files
   */
  constructor(root) {
    this.root = root;

    fse.mkdirpSync(root);
  }

  /**
   * @param {Error} err - Error object
   */
  static errToJson(err) {
    if (!err) throw new Error(`No error found: ${err}`);
    if (!(err instanceof Error)) throw new Error(`Expected type 'Error', got: ${typeof err}`);
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
  }

  /**
   * @param {String} content - Content of the log file
   * @param {String=} name - Name of the file, defaults to `log`
   */
  createLog(content, name = 'log') {
    if (!content) throw new Error(`No content found: ${content}`);
    if (typeof content !== 'string') throw new Error(`Expected type 'string', got: ${typeof content}`);
    fse.writeFileSync(path.join(
      this.root,
      `${new Date().toISOString().replace(/:|\./i, '_')}_${name}.txt`
    ), content);
  }

  /**
   * @param {Error} err - Error object
   * @param {String} name - Name of the file
   * @param {function} cb - Callback, returns stringified error
   */
  createLogError(err, name, cb) {
    const errJson = Logger.errToJson(err);
    this.createLog(errJson, `error_${name || 'unknown'}`);

    if (cb) cb(errJson);
  }
};
