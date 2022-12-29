import test from 'tape';
import fs from 'fs';

import fixture from './fixture';

test('[library.controller.addFolders] scans folders', async t => {
  const { controller, dir, cleanup } = fixture();

  const {
    songs,
    albums,
    labels,
    images
  } = await controller.addFolders([dir.album]);

  t.equal(songs.length, 11, 'scans all files');
  t.equal(albums.length, 1, 'groups songs by album');
  t.equal(labels.length, 1, 'groups albums by label');
  t.equal(images.length, 1, 'groups song images');

  const covers = fs.readdirSync(dir.covers);
  const thumbs = fs.readdirSync(dir.thumbs);

  t.equal(covers.length, 1, 'creates cover image');
  t.equal(thumbs.length, 1, 'creates thumbnail image');

  cleanup();
  t.end();
});

test('[library.controller.addFolders] ignores duplicate files', async t => {
  const { controller, dir, cleanup } = fixture();

  await controller.addFolders([dir.album]);
  const { songs } = await controller.addFolders([dir.album]);
  t.equal(songs.length, 11, 'does not add duplicate files');

  const covers = fs.readdirSync(dir.covers);
  const thumbs = fs.readdirSync(dir.thumbs);

  t.equal(covers.length, 1, 'does not create cover');
  t.equal(thumbs.length, 1, 'does not create thumbnail');

  cleanup();
  t.end();
});
