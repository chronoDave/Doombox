import fs from 'fs';
import path from 'path';

import AppStorage from '../../../../src/app/lib/storage/app.storage';
import shapeApp from '../../../../src/types/shapes/app.shape';

export default () => {
  const root = path.resolve(__dirname, '__storage');
  fs.mkdirSync(root, { recursive: true });

  const storage = new AppStorage({ root });
  // @ts-ignore
  const init = () => fs.writeFileSync(storage._file, JSON.stringify(shapeApp));
  // @ts-ignore
  const cleanup = () => fs.rmSync(root, { force: true, recursive: true });

  return ({
    storage,
    root,
    init,
    cleanup
  });
};
