import path from 'path';
import fs from 'fs';
import produce, { Draft } from 'immer';
import { AnyObjectSchema } from 'yup';

export default class Storage<T> {
  private file: string;
  private schema: AnyObjectSchema;
  data: T;

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

  write(key: keyof Draft<T>, payload: any) {
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
