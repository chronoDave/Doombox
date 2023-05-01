import glob from 'fast-glob';
import path from 'path';
import test from 'tape';

import sender from '../../../../test/lib/electron/sender';
import parse from '../parser/parse';

import groupAlbums from './groupAlbums';
import groupLabels from './groupLabels';

test('[]', async t => {
  const folder = await glob('**/*.mp3', {
    absolute: true,
    cwd: path.resolve(__dirname, '../../../../../test/assets/Bomis Prendin - TEST')
  });
  const { songs } = await parse(sender)(folder);

  const albums = groupAlbums(songs);
  const labels = groupLabels(albums);

  t.equal(labels.length, 1, 'groups labels');
  t.equal(labels[0].albums.length, 1, 'has albums');
  t.equal(labels[0].songs.length, 11, 'has songs');
  t.equal(Math.round(labels[0].duration ?? 0), 1422, 'sums duration');

  t.end();
});
