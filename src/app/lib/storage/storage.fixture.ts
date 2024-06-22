import fs from 'fs';
import path from 'path';

import cacheShape from '../../../types/shapes/cache.shape';

import createStorage from './storage';

export default () => {
  const root = path.resolve(__dirname, '__storage');
  fs.mkdirSync(root, { recursive: true });

  const storage = createStorage(root)(cacheShape, 'cache');
  // @ts-expect-error: Ignore private
  const init = () => fs.writeFileSync(storage._file, JSON.stringify(cacheShape));
  const cleanup = () => fs.rmSync(root, { force: true, recursive: true });

  return ({
    storage,
    root,
    init,
    cleanup
  });
};
