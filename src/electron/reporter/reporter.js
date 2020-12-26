const path = require('path');
const fs = require('fs');

module.exports = class Reporter {
  /**
   * @param {string} root
   */
  constructor(root) {
    this.root = root;

    fs.mkdirSync(root, { recursive: true });
  }

  /**
   * @param {string} text - Log content
   * @param {string} type - Log type (default `LOG`)
   */
  log(text, type = 'LOG') {
    const file = `[${type}] ${new Date().getTime()}.txt`;

    fs.writeFileSync(path.join(this.root, file), text);
  }

  logError(err) {
    this.log([
      `TIME\n${new Date().toLocaleString()} (local time)`,
      `MESSAGE\n${err.message}`,
      `STACK\n${err.stack}`
    ].join('\n\n'), 'ERROR');
  }
};
