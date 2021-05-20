import fs from 'fs';
import path from 'path';

import { getTimestampDate } from '@doombox-utils';

export const createLog = (root: string) => {
  fs.mkdirSync(root, { recursive: true });

  return (
    text: string,
    title: string,
    type: 'log' | 'error' = 'log'
  ) => fs.writeFileSync(
    path.join(root, `[${getTimestampDate()}] ${title} (${type})`),
    text
  );
};

export const createLogErr = (root: string) => (err: Error, title: string) => createLog(root)([
  `TIME\n${new Date().toLocaleDateString()} (local time)`,
  `MESSAGE\n${err.message}`,
  `STACK\n${err.stack}`
].join('\n\n'), title, 'error');
