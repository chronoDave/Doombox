import fs from 'fs';
import path from 'path';

import Storage from '../../../../src/app/lib/storage';
import appShape from '../../../../src/types/shapes/app.shape';

export default () => {
  const root = path.resolve(__dirname, '__storage');
  fs.mkdirSync(root, { recursive: true });

  const storage = new Storage({ root, name: 'app', shape: appShape });
  // @ts-ignore
  const init = () => fs.writeFileSync(storage._file, JSON.stringify(appShape));
  // @ts-ignore
  const cleanup = () => fs.rmSync(root, { force: true, recursive: true });

  return ({
    storage,
    root,
    init,
    cleanup
  });
};
