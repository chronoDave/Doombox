import glob from 'fast-glob';
import path from 'path';
import test from 'tape';

import Parser from '../parser/parser';

import Library from './library';

test('[library.getAlbums] groups songs into albums', async t => {
  const parser = new Parser();
  const folder = await glob('**/*.mp3', {
    absolute: true,
    cwd: path.resolve(__dirname, '../../../../../test/assets/Bomis Prendin - TEST')
  });
  const { songs } = await parser.parse(folder);

  const albums = Library.getAlbums(songs);

  t.equal(albums.length, 1, 'groups albums');
  t.equal(Math.round(albums[0].duration ?? 0), 1422, 'sums duration');

  t.end();
});

test('[library.getLabels] groups albums into labels', async t => {
  const parser = new Parser();
  const folder = await glob('**/*.mp3', {
    absolute: true,
    cwd: path.resolve(__dirname, '../../../../../test/assets/Bomis Prendin - TEST')
  });
  const { songs } = await parser.parse(folder);

  const albums = Library.getAlbums(songs);
  const labels = Library.getLabels(albums);

  t.equal(labels.length, 1, 'groups labels');
  t.equal(labels[0].albums.length, 1, 'has albums');
  t.equal(labels[0].songs.length, 11, 'has songs');
  t.equal(Math.round(labels[0].duration ?? 0), 1422, 'sums duration');

  t.end();
});
