import fs from 'fs';
import path from 'path';

import cacheShape from '../../types/shapes/cache.shape';

import Storage from './storage';

export default () => {
  const root = path.resolve(__dirname, '__storage');
  const name = 'cache';

  fs.mkdirSync(root, { recursive: true });

  const storage = new Storage({ file: { root, name }, shape: cacheShape });
  const file = path.join(root, `${name}.json`);

  const init = () => fs.writeFileSync(file, JSON.stringify(cacheShape));
  const cleanup = () => fs.rmSync(root, { force: true, recursive: true });

  return ({
    file,
    shape: cacheShape,
    storage,
    root,
    init,
    cleanup
  });
};
