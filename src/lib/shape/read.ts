import type { Shape } from '@doombox/types/primitives';

import fs from 'fs';

import parse from './parse';

export default <T extends Shape>(file: string, shape: T) => {
  try {
    return parse<T>(fs.readFileSync(file, 'utf-8')) ?? shape;
  } catch (err) {
    return shape;
  }
};
