import fs from 'fs';
import path from 'path';

import Logger from '../../../../src/app/lib/logger';

export default () => {
  const logger = new Logger({ root: path.join(__dirname, '__logs') });
  // @ts-ignore
  const cleanup = () => fs.rmSync(logger._root, { recursive: true, force: true });

  return ({
    logger,
    cleanup
  });
};
