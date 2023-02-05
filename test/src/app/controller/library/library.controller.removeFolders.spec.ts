import test from 'tape';

import fixture from './fixture';

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
