import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import { isDev } from './utils';

export default class Logger {
  static get root() {
    return isDev() ?
      path.resolve(__dirname, '../userData/logs') :
      app.getPath('logs');
  }

  static log(data: string, type: 'info' | 'error') {
    const now = new Date().toISOString().replace(/:|\./g, '-');
    const file = `${now} (${type}).txt`;

    fs.writeFileSync(path.join(this.root, file), [
      `TIME\n${new Date().toLocaleString()} (local time)`,
      data
    ].join('\n\n'));
  }

  static info(text: string) {
    this.log(text, 'info');
  }

  static error(err: Error) {
    this.log([
      `MESSAGE\n${err.message}`,
      `STACK\n${err.stack}`
    ].join('\n\n'), 'error');
  }
}
