import test from 'tape';

import { setup } from './_utils';

test('[Audio.stop] should stop', t => {
  const audio = setup();

  audio.stop();
  t.false(
    audio.instance,
    'removes instance'
  );

  t.end();
});
