import type { Path, Shape } from '@doombox/types/primitives';

import fs from 'fs';
import path from 'path';

import read from '@doombox/lib/shape/read';
import Store from '@doombox/lib/store/store';

export type StorageProps<T extends Shape> = {
  file: Path
  shape: T
};

export default class Storage<T extends Shape> extends Store<T> {
  constructor(props: StorageProps<T>) {
    const file = path.join(props.file.root, `${props.file.name}.json`);

    super(read(file, props.shape));

    this.on(state => fs.writeFileSync(file, JSON.stringify(state, null, '\t')));
  }
}
