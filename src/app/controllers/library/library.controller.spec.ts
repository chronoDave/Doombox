import fs from 'fs';
import test from 'tape';

import fixture from './library.controller.fixture';

test('[library.controller.add] scans folders', async t => {
  const { controller, dir, cleanup } = await fixture();

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
  const { controller, dir, cleanup } = await fixture();

  await controller.add([dir.album]);
  const { songs } = await controller.add([dir.album]);
  t.equal(songs.length, 11, 'does not add duplicate files');

  const covers = fs.readdirSync(dir.covers);

  t.equal(covers.length, 1, 'does not create cover');

  cleanup();
  t.end();
});

test('[library.controller.reindex] removes folders', async t => {
  const { controller, dir, cleanup } = await fixture();

  await controller.add([dir.album]);
  const library = await controller.reindex([dir.sideOne]);

  t.equal(library.songs.length, 6, 'deletes stale songs');
  t.equal(library.albums.length, 1, 'rebuilds albums');
  t.equal(library.labels.length, 1, 'rebuilds labels');

  cleanup();
  t.end();
});

test('[library.controller.remove] removes folders', async t => {
  const { controller, dir, cleanup } = await fixture();

  await controller.remove([dir.album]);
  const { songs, albums, labels } = await controller.remove([dir.album]);

  t.equal(songs.length, 0, 'deletes songs');
  t.equal(albums.length, 0, 'deletes songs');
  t.equal(labels.length, 0, 'deletes songs');

  cleanup();
  t.end();
});
