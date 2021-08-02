import fs from 'fs';
import path from 'path';

import { DIR_LOG } from '../const';

type Type = 'log' | 'warning' | 'error';

export default class Reporter {
  private static getTimestamp() {
    const now = new Date();

    const dy = now.getFullYear();
    const dm = `${now.getUTCMonth() + 1}`.padStart(2, '0');
    const dd = now.getUTCDate();
    const th = `${now.getHours()}`.padStart(2, '0');
    const tm = `${now.getMinutes()}`.padStart(2, '0');
    const ts = `${now.getSeconds()}`.padStart(2, '0');

    return `${dy}-${dm}-${dd}_${th}-${tm}-${ts}`;
  }

  private static formatError(error: Error, description?: string) {
    return [
      `TIME\n${new Date().toLocaleString()} (local time)`,
      description && `DESCRIPTION\n${description}`,
      `MESSAGE\n${error.message}`,
      `STACK\n${error.stack}`
    ].filter(x => x).join('\n\n');
  }

  static log(title: string, text: string, type: Type = 'log') {
    fs.writeFileSync(
      path.join(DIR_LOG, `${this.getTimestamp()} - ${type.toUpperCase()} - ${title}.txt`),
      text
    );
  }

  static warn(title: string, error: Error, description?: string) {
    this.log(title, this.formatError(error, description), 'warning');
  }

  static error(title: string, error: Error, description?: string) {
    this.log(title, this.formatError(error, description), 'error');
  }
}
