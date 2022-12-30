import test from 'tape';

import fixture from './fixture';

test('[library.controller.remove] removes folders', async t => {
  const { controller, dir, cleanup } = fixture();

  await controller.add([dir.album]);
  const library = await controller.rebuild([dir.sideOne]);

  t.equal(library.songs.length, 6, 'deletes stale songs');
  t.equal(library.albums.length, 1, 'rebuilds albums');
  t.equal(library.labels.length, 1, 'rebuilds labels');

  cleanup();
  t.end();
});
