/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import cluster from 'cluster';
import os from 'os';
import walk from '@chronocide/fs-walk';
import match from 'picomatch';

import { splitRr } from '../src/utils/array';

const N_CPU = os.cpus().length;

const [folder, glob] = process.argv.slice(2);
const isMatch = match(glob ?? '**/*.spec.ts');
const chunks = splitRr(
  walk(path.resolve(process.cwd(), folder))
    .filter(x => isMatch(x)),
  N_CPU
);

if (cluster.isPrimary) {
  for (let i = 0; i < N_CPU; i += 1) cluster.fork();
} else if (cluster.worker) {
  chunks[cluster.worker.id - 1].forEach(require);
  cluster.worker.disconnect();
}
