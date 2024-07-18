import path from 'path';
import test from 'tape';

import globs from './globs';

test('[globs] returns files from multiple directories', async t => {
  const files = await globs('**/*.mp3')([
    path.join(process.cwd(), 'test/assets/Bomis Prendin - TEST/side one'),
    path.join(process.cwd(), 'test/assets/Bomis Prendin - TEST/side two')
  ]);

  t.equal(files.length, 11, 'returns files');

  t.end();
});
