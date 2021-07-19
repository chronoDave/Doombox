import path from 'path';
import fs from 'fs';
import produce, { Draft } from 'immer';
import { SchemaOf } from 'yup';

import Reporter from '../reporter';
import { DIR_ROOT } from '../const';

export default class Storage<T> {
  private name: string;
  private file: string;
  private schema: SchemaOf<T>;
  private data: T;

  constructor(name: string, schema: SchemaOf<T>) {
    this.name = name;
    this.file = path.join(DIR_ROOT, `${this.name}.json`);
    this.schema = schema;

    this.data = this.read();
  }

  private read() {
    try {
      const payload = JSON.parse(fs.readFileSync(this.file, 'utf-8'));
      this.schema.validateSync(payload, { strict: true });

      return payload;
    } catch (err) {
      if (err.code !== 'ENOENT') {
        Reporter.warn(this.name, err, `Failed to load: "${this.file}", falling back to default`);
      }
      return this.schema.getDefault();
    }
  }

  get<K extends keyof T>(key: K) {
    return this.data[key];
  }

  // TODO: Refactor => Storage should implement its own getters and setters
  set<K extends keyof Draft<T>>(key: K, payload: any) {
    this.data = produce(this.data, draft => {
      if (typeof draft[key] === 'object') {
        Object.assign(draft[key], payload);
      } else {
        draft[key] = payload;
      }
    });

    fs.writeFileSync(this.file, JSON.stringify(this.data, null, '\t'));
  }
}
