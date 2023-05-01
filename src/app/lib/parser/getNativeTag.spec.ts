import type { INativeTags } from 'music-metadata/lib/type';

import test from 'tape';

import createGetNativeTag from './getNativeTag';

test('[getNativeTag] gets native tag', t => {
  const nativeTags: INativeTags = {
    NATIVE: [{ id: 'NATIVE', value: 1 }],
    TAG: [{ id: 'TAG', value: 2 }]
  };

  const getNativeTag = createGetNativeTag(nativeTags);

  t.equal(getNativeTag('NATIVE'), 1, 'gets native tag');
  t.false(getNativeTag('TEST'), 'does not return tag');

  t.end();
});
