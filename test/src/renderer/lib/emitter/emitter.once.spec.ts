import test from 'tape';

import Emitter from '../../../../../src/renderer/lib/emitter/emitter';

test('[emitter.once] fires event once', t => {
  const emiter = new Emitter();

  let n = 0;
  const cb = () => { n += 1; };
  const event = 'test';
  emiter.once(event, cb);
  emiter.emit(event, '');
  emiter.emit(event, '');

  t.equal(n, 1, 'fires event once');

  t.end();
});
