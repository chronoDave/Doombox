import fs from 'fs';
import path from 'path';

import appShape from '../../../types/shapes/app.shape';

import Storage from './storage';

export default () => {
  const root = path.resolve(__dirname, '__storage');
  fs.mkdirSync(root, { recursive: true });

  const storage = new Storage({ root, name: 'app', shape: appShape });
  // @ts-expect-error: Ignore private
  const init = () => fs.writeFileSync(storage._file, JSON.stringify(appShape));
  const cleanup = () => fs.rmSync(root, { force: true, recursive: true });

  return ({
    storage,
    root,
    init,
    cleanup
  });
};
