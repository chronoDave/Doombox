import test from 'tape';

import EventEmitter from '../../../../src/lib/eventEmitter';

test('[eventEmitter.once] fires event once', t => {
  const emiter = new EventEmitter();

  let n = 0;
  const fn = () => { n += 1; };
  const event = 'test';
  emiter.once(event, fn);
  emiter.emit(event, '');
  emiter.emit(event, '');

  t.equal(n, 1, 'fires event once');

  t.end();
});
