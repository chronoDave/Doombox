import fs from 'fs';
import path from 'path';

export type LoggerProps = {
  root: string
};

export default class Logger {
  private readonly _root: string;

  private _log(data: string, type: 'info' | 'error') {
    const now = new Date().toISOString().replace(/:|\./g, '-');
    const file = `${now} (${type}).txt`;

    fs.writeFileSync(path.join(this._root, file), [
      `TIME\n${new Date().toLocaleString()} (local time)`,
      data
    ].join('\n\n'));
  }

  constructor(props: LoggerProps) {
    this._root = props.root;

    fs.mkdirSync(this._root, { recursive: true });
  }

  info(text: string) {
    this._log(text, 'info');
  }

  error(err: Error) {
    this._log([
      `MESSAGE\n${err.message}`,
      `STACK\n${err.stack}`
    ].join('\n\n'), 'error');
  }
}
