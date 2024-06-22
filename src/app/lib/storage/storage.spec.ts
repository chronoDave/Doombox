import deepEqual from 'fast-deep-equal';
import test from 'tape';

import cacheShape from '@doombox/types/shapes/cache.shape';

import fixture from './storage.fixture';

test('[storage] should read file', t => {
  const { storage, init, cleanup } = fixture();
  init();

  // @ts-expect-error: Ignore private
  t.true(deepEqual(storage._state, cacheShape), 'reads file');

  cleanup();
  t.end();
});
