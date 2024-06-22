import type { Shape } from '@doombox/types/primitives';

import merge from 'deepmerge';
import fs from 'fs';
import path from 'path';

import parse from '@doombox/lib/shape/parse';
import Store from '@doombox/lib/store/store';

export default (root: string) => <S extends Shape>(name: string, shape: S) => {
  const file = path.resolve(root, `${name}.json`);
  const json = parse<S>(fs.readFileSync(file, 'utf-8'));
  const initial = json ? merge<S>(shape, json) : shape;

  const store = new Store(initial).subscribe(state => {
    fs.writeFileSync(file, JSON.stringify(state, null, '\t'));
  });

  return store;
};
