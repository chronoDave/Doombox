import test from 'tape';

import fixture from './fixture';

test('[library.controller.removeFolders] removes folders', async t => {
  const { controller, dir, cleanup } = fixture();

  await controller.addFolders([dir.album]);
  const {
    songs,
    albums,
    labels,
    images
  } = await controller.removeFolders([dir.album]);

  t.equal(songs.length, 0, 'deletes songs');
  t.equal(albums.length, 0, 'deletes songs');
  t.equal(labels.length, 0, 'deletes songs');
  t.equal(images.length, 1, 'does not delete images');

  cleanup();
  t.end();
});
