import path from 'path';
import fs from 'fs';
import produce from 'immer';

import { Shape } from '../../types';
import { mergeShape, parseShape } from '../../utils/shape';

export type StorageProps<T extends Shape> = {
  root: string,
  name: string
  shape: T
};

export default class Storage<T extends Shape> {
  protected readonly _file: string;
  protected _data: T;

  private _read() {
    try {
      return parseShape(fs.readFileSync(this._file, 'utf8'));
    } catch (err) {
      // File does not exist
      return null;
    }
  }

  constructor(props: StorageProps<T>) {
    this._file = path.join(props.root, `${props.name}.json`);

    const json = this._read();
    this._data = json ?
      mergeShape(props.shape, json) :
      props.shape;

    Object.seal(this._data);
  }

  get(key: keyof T) {
    return this._data[key];
  }

  set(key: keyof T, value: T[keyof T]) {
    this._data = produce(this._data, (draft: T) => {
      draft[key] = value;
    });
  }

  write() {
    fs.writeFileSync(this._file, JSON.stringify(this._data, null, '\t'));
  }
}
