import fs from 'fs';
import path from 'path';

export type LoggerProps = {
  root: string
};

export default class Logger {
  private readonly _root: string;

  constructor(props: LoggerProps) {
    this._root = props.root;
  }

  log(data: string, type: 'info' | 'error') {
    const now = new Date().toISOString().replace(/:|\./g, '-');
    const file = `${now} (${type}).txt`;

    fs.writeFileSync(path.resolve(this._root, file), [
      `TIME\n${new Date().toLocaleString()} (local time)`,
      data
    ].join('\n\n'));
  }

  info(text: string) {
    this.log(text, 'info');
  }

  error(err: Error) {
    this.log([
      `MESSAGE\n${err.message}`,
      `STACK\n${err.stack}`
    ].join('\n\n'), 'error');
  }
}
