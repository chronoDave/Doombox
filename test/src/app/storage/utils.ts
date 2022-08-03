import fs from 'fs';

import AppStorage from '../../../../src/app/lib/storage/app.storage';
import shapeApp from '../../../../src/types/shapes/app.shape';

export default () => {
  const storage = new AppStorage({ root: __dirname });
  // @ts-ignore
  const write = () => fs.writeFileSync(storage._file, JSON.stringify(shapeApp));
  // @ts-ignore
  const cleanup = () => fs.rmSync(storage._file, { force: true });

  return ({
    storage,
    write,
    cleanup
  });
};
