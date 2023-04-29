import type { Shape } from '../../../types/primitives';

import merge from 'deepmerge';
import fs from 'fs';
import path from 'path';

import parse from '../../../utils/shape/parse';

export type StorageProps<T> = {
  root: string
  name: string
  shape: T
};

export default class Storage<T extends Shape> {
  private readonly _root: string;

  protected readonly _file: string;
  protected _data: T;

  private _read() {
    try {
      return parse<T>(fs.readFileSync(this._file, 'utf-8'));
    } catch (err) {
      return null; // File does not exist
    }
  }

  constructor(props: StorageProps<T>) {
    this._root = props.root;
    this._data = props.shape;
    this._file = path.join(this._root, `${props.name}.json`);

    const json = this._read();
    if (json) this._data = merge<T>(this._data, json);

    Object.seal(this._data);
  }

  get<K extends keyof T>(key: K): Readonly<T[K]> {
    return this._data[key];
  }

  set(state: T) {
    this._data = state;
    fs.writeFileSync(this._file, JSON.stringify(this._data, null, '\t'));

    return this._data;
  }

  all() {
    return this._data;
  }
}
