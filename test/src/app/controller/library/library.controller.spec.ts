import test from 'tape';
import fs from 'fs';

import fixture from './fixture';

test('[library.controller.addFolders] scans folders', async t => {
  const { controller, dir, cleanup } = fixture();

  const songs = await controller.addFolders([dir.album]);
  t.equal(songs.length, 11, 'scans all files');

  const covers = fs.readdirSync(dir.covers);
  const thumbs = fs.readdirSync(dir.thumbs);

  t.equal(covers.length, 1, 'creates cover');
  t.equal(thumbs.length, 1, 'creates thumbnail');

  cleanup();
  t.end();
});

test('[library.controller.addFolders] ignores duplicate files', async t => {
  const { controller, dir, cleanup } = fixture();

  await controller.addFolders([dir.album]);
  const songs = await controller.addFolders([dir.album]);
  t.equal(songs.length, 11, 'does not add duplicate files');

  const covers = fs.readdirSync(dir.covers);
  const thumbs = fs.readdirSync(dir.thumbs);

  t.equal(covers.length, 1, 'does not create cover');
  t.equal(thumbs.length, 1, 'does not create thumbnail');

  cleanup();
  t.end();
});

test('[library.controller.removeFolders] removes folders', async t => {
  const { controller, dir, cleanup } = fixture();

  await controller.addFolders([dir.album]);
  const songs = await controller.removeFolders([dir.album]);
  t.equal(songs.length, 0, 'deletes songs');

  cleanup();
  t.end();
});
