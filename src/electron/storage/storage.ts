import path from 'path';
import fs from 'fs';
import { AnyObjectSchema } from 'yup';

import { ValueOf, KeyOfString } from '../../types';

export default class Storage<T> {
  private file: string;
  private schema: AnyObjectSchema;
  private data: Record<string, any>;

  constructor(root: string, name: string, schema: AnyObjectSchema) {
    this.file = path.join(root, `${name}.json`);
    this.schema = schema;

    this.data = this.read();

    fs.mkdirSync(root, { recursive: true });
  }

  read() {
    let payload;

    try {
      payload = JSON.parse(fs.readFileSync(this.file, 'utf-8'));
      this.schema.validateSync(payload);
      return payload;
    } catch (err) {
      return this.schema.getDefault();
    }
  }

  get(key: KeyOfString<T>): ValueOf<T> {
    return this.data[key];
  }

  set(key: KeyOfString<T>, payload: Record<string, unknown>) {
    Object.assign(this.data[key], payload);
    fs.writeFileSync(this.file, JSON.stringify(this.data, null, '\t'));
  }
}
