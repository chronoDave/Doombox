import path from 'path';
import fs from 'fs';
import { SchemaOf } from 'yup';

import Reporter from '../reporter';
import { DIR_ROOT } from '../const';

export default class Storage<T> {
  private name: string;
  private file: string;
  private schema: SchemaOf<T>;
  protected data: T;

  constructor(name: string, schema: SchemaOf<T>) {
    this.name = name;
    this.file = path.join(DIR_ROOT, `${this.name}.json`);
    this.schema = schema;

    this.data = this.read();
  }

  protected read() {
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

  protected write() {
    console.log(this.data);

    fs.writeFileSync(this.file, JSON.stringify(this.data, null, '\t'));
  }
}
