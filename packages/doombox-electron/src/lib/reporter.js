const fse = require('fs-extra');
const path = require('path');
const { getTimestamp } = require('@doombox/utils');

module.exports = class Reporter {
  /**
   * @param {string} root
   */
  constructor(root) {
    this.root = root;

    fse.mkdirpSync(root);
  }

  /**
   * @param {string} text Log content
   * @param {string} name File name. Defaults to `unknown`
   */
  log(text, name = 'unknown') {
    const file = `[LOG] ${name} (${getTimestamp()}).txt`;
    fse.writeFileSync(path.join(this.root, file), text);
  }

  /**
   * @param {Error} err
   * @param {string} name - File name. Defaults to `unknown`
   */
  logError(err, name = 'unknown') {
    const text = [
      `TIME\n${new Date().toLocaleString()} (local time)`,
      `MESSAGE\n${err.message}`,
      `STACK\n${err.stack}`
    ].join('\n\n');
    const file = `[ERROR] ${name} (${getTimestamp()}).txt`;
    fse.writeFileSync(path.join(this.root, file), text);
  }
};
