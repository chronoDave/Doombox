import fs from 'fs';
import path from 'path';
import produce from 'immer';

import type { Shape } from '../../../types';
import { debounce } from '../../../utils/function';
import { parseShape } from '../../../utils/shape';

export type StorageProps<T> = {
  root: string
  name: string
  shape: T
};

export default abstract class Storage<T extends Shape> {
  private readonly _write: () => Promise<void>;
  protected readonly _file: string;
  protected _data: T;

  private _read() {
    try {
      return parseShape(fs.readFileSync(this._file, 'utf-8'));
    } catch (err) {
      return null; // File does not exist
    }
  }

  protected abstract _merge(shape: Shape): T;

  constructor(props: StorageProps<T>) {
    this._data = props.shape;
    this._file = path.join(props.root, `${props.name}.json`);
    this._write = debounce(() => fs.writeFileSync(this._file, JSON.stringify(this._data, null, '\t')), 100);

    const json = this._read();
    if (json) this._data = this._merge(json);

    Object.seal(this._data);
  }

  get<K extends keyof T>(key: K): Readonly<T[K]> {
    return this._data[key];
  }

  set<K extends keyof T>(key: K, value: Partial<T[K]>) {
    this._data = produce(this._data, (draft: T) => {
      // @ts-ignore
      Object.assign(draft[key], value);
    });

    return this._write();
  }
}
