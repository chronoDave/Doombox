import test from 'ava';
import sinon from 'sinon';

import { setup } from './_utils';

test('should stop', t => {
  const audio = setup();

  audio.stop();
  t.falsy(audio.instance, 'removed instance');

  sinon.restore();
});
