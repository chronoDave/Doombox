import fs from 'fs';
import path from 'path';

import Logger from './logger';

export default () => {
  const root = path.resolve(__dirname, '__logs');
  fs.mkdirSync(root);

  const logger = new Logger({ root });

  const cleanup = () => fs.rmSync(root, { recursive: true, force: true });

  return ({
    root,
    logger,
    cleanup
  });
};
