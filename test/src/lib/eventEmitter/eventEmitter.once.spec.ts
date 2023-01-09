import test from 'tape';

import EventEmitter from '../../../../src/utils/event/eventEmitter';

test('[eventEmitter.once] fires event once', t => {
  const emiter = new EventEmitter();

  let n = 0;
  const cb = () => { n += 1; };
  const event = 'test';
  emiter.once(event, cb);
  emiter.emit(event, '');
  emiter.emit(event, '');

  t.equal(n, 1, 'fires event once');

  t.end();
});
