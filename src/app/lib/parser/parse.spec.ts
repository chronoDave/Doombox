import glob from 'fast-glob';
import path from 'path';
import test from 'tape';

import sender from '../../../../test/lib/electron/sender';

import parse from './parse';

test('[parse] parses files', async t => {
  const folder = await glob('**/*.mp3', {
    absolute: true,
    cwd: path.resolve(__dirname, '../../../../../test/assets/Bomis Prendin - TEST')
  });

  const { songs, images } = await parse(sender)(folder);
  const imageIds = new Set(songs.map(song => song.image));

  t.equal(songs.length, 11, 'parses all songs');
  t.equal(images.size, 1, 'parses all images');
  t.equal(imageIds.size, 1, 'creates unique image ids');

  t.end();
});
