const path = require('path');

const fs = require('fs');

const { getTimestamp } = require('@doombox-utils');

module.exports = class Reporter {
  /**
   * @param {string} root
   */
  constructor(root) {
    this.root = root;
  }

  /**
   * @param {string} text - Log content
   * @param {string} name - File name (default `unknown`)
   * @param {string} type - Log type (default `LOG`)
   */
  log(text, name = 'unknown', type = 'LOG') {
    const file = `[${getTimestamp()}] ${name} (${type}).txt`;

    fs.writeFileSync(path.join(this.root, file), text);
  }

  logError(err, name = 'unknown') {
    const text = [
      `TIME\n${new Date().toLocaleString()} (local time)`,
      `MESSAGE\n${err.message}`,
      `STACK\n${err.stack}`
    ].join('\n\n');

    this.log(text, name, 'ERROR');
  }
};
