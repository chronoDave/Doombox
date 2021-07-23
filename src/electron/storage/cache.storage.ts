import * as yup from 'yup';
import { Cache } from '@doombox/config';

import Storage from './storage';

export default new class extends Storage<Cache> {
  constructor() {
    super('cache', yup.object({
      window: yup.object({
        x: yup.number(),
        y: yup.number(),
        width: yup.number().min(320).default(320),
        height: yup.number().min(240).default(240)
      }).required()
    }));
  }

  get() {
    return this.data;
  }

  set(data: Cache) {
    this.data = data;
    this.write();
  }

  get window() {
    return this.data.window;
  }

  set position(position: { x: number, y: number }) {
    this.window.x = position.x;
    this.window.y = position.y;

    this.write();
  }

  set dimensions(dimensions: { width: number, height: number }) {
    this.window.width = dimensions.width;
    this.window.height = dimensions.height;

    this.write();
  }
}();
