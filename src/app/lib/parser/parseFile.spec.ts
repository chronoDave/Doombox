import path from 'path';
import test from 'tape';

import parseFile from './parseFile';

test('[parseFile] parses file', async t => {
  const file = path.resolve(__dirname, '../../../../../test/assets/Bomis Prendin - TEST/side one/01 Bomis Prendin - Rastamunkies.mp3');
  const song = await parseFile(file);

  t.true(song, 'parses file');
  t.equal(song.title, 'Rastamunkies', 'parses common tag');
  t.equal(song.date, '2010-04-16 16:40:50', 'parses native tag');
  t.true(song.image, 'parses image');

  t.end();
});
