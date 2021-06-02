import path from 'path';
import fs from 'fs';
import produce, { Draft } from 'immer';
import { SchemaOf } from 'yup';
import { JSON } from '@doombox-types';

export default class Storage<T> {
  private file: string;
  private schema: SchemaOf<T>;
  private data: T;

  constructor(root: string, name: string, schema: SchemaOf<T>) {
    this.file = path.join(root, `${name}.json`);
    this.schema = schema;

    this.data = this.read();

    fs.mkdirSync(root, { recursive: true });
  }

  private read() {
    try {
      const payload = JSON.parse(fs.readFileSync(this.file, 'utf-8'));
      this.schema.validateSync(payload);
      return payload;
    } catch (err) {
      return this.schema.getDefault();
    }
  }

  get<K extends keyof T>(key: K) {
    // if (!key) return this.data as T;
    return this.data[key];
  }

  set<K extends keyof Draft<T>>(key: K, payload: JSON) {
    this.data = produce(this.data, draft => {
      if (typeof draft[key] === 'object') {
        Object.assign(draft[key], payload);
      } else {
        draft[key] = payload as any;
      }
    });

    fs.writeFileSync(this.file, JSON.stringify(this.data, null, '\t'));
  }
}
