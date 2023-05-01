import glob from 'fast-glob';
import path from 'path';
import test from 'tape';

import sender from '../../../../test/lib/electron/sender';
import parse from '../parser/parse';

import groupAlbums from './groupAlbums';

test('[groupAlbum] groups songs', async t => {
  const folder = await glob('**/*.mp3', {
    absolute: true,
    cwd: path.resolve(__dirname, '../../../../../test/assets/Bomis Prendin - TEST')
  });
  const { songs } = await parse(sender)(folder);

  const albums = groupAlbums(songs);

  t.equal(albums.length, 1, 'groups albums');
  t.equal(Math.round(albums[0].duration ?? 0), 1422, 'sums duration');

  t.end();
});
