import fs from 'fs';
import test from 'tape';

import fixture from './fixture';

test('[library.controller.add] scans folders', async t => {
  const { controller, dir, cleanup } = fixture();

  const { songs, albums, labels } = await controller.add([dir.album]);

  t.equal(songs.length, 11, 'scans all files');
  t.equal(albums.length, 1, 'groups songs by album');
  t.equal(labels.length, 1, 'groups albums by label');

  const covers = fs.readdirSync(dir.covers);

  t.equal(covers.length, 1, 'creates cover');

  cleanup();
  t.end();
});

test('[library.controller.add] ignores duplicate files', async t => {
  const { controller, dir, cleanup } = fixture();

  await controller.add([dir.album]);
  const { songs } = await controller.add([dir.album]);
  t.equal(songs.length, 11, 'does not add duplicate files');

  const covers = fs.readdirSync(dir.covers);

  t.equal(covers.length, 1, 'does not create cover');

  cleanup();
  t.end();
});
