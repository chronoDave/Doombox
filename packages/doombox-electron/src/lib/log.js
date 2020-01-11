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
  errToJson(err) {
    if (!err) throw new Error(`No error found: ${err}`);
    if (!(err instanceof Error)) throw new Error(`Expected type 'Error', got: ${typeof err}`);
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
  }

  /**
   * @param {String} content - Content of the log file
   * @param {String=} name - Name of the file, defaults to current UTC date
   */
  createLog(content, name) {
    if (!content) throw new Error(`No content found: ${content}`);
    if (typeof content !== 'string') throw new Error(`Expected type 'string', got: ${typeof content}`);
    fse.writeFileSync(path.join(
      this.root,
      `${name ? `${name}_` : ''}${new Date().getUTCDate()}.txt`
    ), content);
  }

  /**
   * @param {Error} err - Error object
   * @param {String=} name - Name of the file, defaults to `error`
   */
  createLogError(err, name) {
    this.createLog(this.errToJson(err), `error${name ? `_${name}` : ''}`);
  }
};
