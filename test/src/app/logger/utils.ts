import fs from 'fs';

import Logger from '../../../../src/app/lib/logger';

export default () => {
  // @ts-ignore
  fs.mkdirSync(Logger._root, { recursive: true });

  // @ts-ignore
  const cleanup = () => fs.rmSync(Logger._root, { recursive: true, force: true });

  return ({
    cleanup
  });
};
