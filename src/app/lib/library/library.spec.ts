import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';
import test from 'tape';

import fixture from './library.fixture';

test('[library.insert] inserts songs into library', async t => {
  const { library, root, cleanup } = await fixture();
  const files = await glob('**/*.mp3', {
    absolute: true,
    cwd: path.resolve(__dirname, '../../../../../test/assets/Bomis Prendin - TEST')
  });

  const { songs, albums, labels } = await library.insert(files);

  t.equal(songs.length, 11, 'creates songs');
  t.equal(albums.length, 1, 'groups albums');
  t.equal(Math.round(albums[0].duration ?? 0), 1422, 'sums album duration');
  t.equal(labels.length, 1, 'groups labels');
  t.equal(labels[0].albums.length, 1, 'label has albums');
  t.equal(labels[0].songs.length, 11, 'label has songs');
  t.equal(Math.round(labels[0].duration ?? 0), 1422, 'sums label duration');
  t.equal(fs.readdirSync(root).length, 6, 'writes cover');

  cleanup();
  t.end();
});
