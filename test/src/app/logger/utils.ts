import fs from 'fs';

import Logger from '../../../../src/app/lib/logger';

export default () => {
  fs.mkdirSync(Logger.root, { recursive: true });
  const cleanup = () => fs.rmSync(Logger.root, { recursive: true, force: true });

  return ({
    cleanup
  });
};
