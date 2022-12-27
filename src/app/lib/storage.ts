import type { Shape } from '../../types/primitives';

import fs from 'fs';
import path from 'path';
import produce from 'immer';

import { mergeShape, parseShape } from '../../utils/shape';
import { isObject } from '../../utils/validation';

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
      return parseShape(fs.readFileSync(this._file, 'utf-8'));
    } catch (err) {
      return null; // File does not exist
    }
  }

  constructor(props: StorageProps<T>) {
    this._root = props.root;
    this._data = props.shape;
    this._file = path.join(this._root, `${props.name}.json`);

    const json = this._read();
    if (json) this._data = mergeShape(this._data, json);

    Object.seal(this._data);
  }

  get<K extends keyof T>(key: K): Readonly<T[K]> {
    return this._data[key];
  }

  set<K extends keyof T>(key: K, value: Partial<T[K]>) {
    this._data = produce(this._data, (draft: T) => {
      if (isObject(value) && isObject(draft[key])) {
        // @ts-ignore
        Object.assign(draft[key], value);
      } else {
        // @ts-ignore
        draft[key] = value;
      }
    });

    fs.writeFileSync(this._file, JSON.stringify(this._data, null, '\t'));
  }

  all() {
    return this._data;
  }
}
