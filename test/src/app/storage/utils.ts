import fs from 'fs';

import AppStorage from '../../../../src/app/lib/storage/app.storage';
import shapeApp from '../../../../src/shapes/app.shape';

export const storage = new AppStorage({ root: __dirname });

// @ts-ignore
export const init = () => fs.writeFileSync(storage._file, JSON.stringify(shapeApp));
// @ts-ignore
export const cleanup = () => fs.rmSync(storage._file, { force: true });
