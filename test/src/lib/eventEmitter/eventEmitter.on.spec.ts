import test from 'tape';

import EventEmitter from '../../../../src/utils/event/eventEmitter';

test('[eventEmitter.on] creates event listener', t => {
  const emiter = new EventEmitter();

  const cb = () => {};
  const event = 'test';
  emiter.on(event, cb);

  // @ts-expect-error: Ignore private
  t.true(Array.isArray(emiter._listeners.get(event)), 'creates event list');
  // @ts-expect-error: Ignore private
  t.true(emiter._listeners.get(event).includes(cb));

  t.end();
});

test('[eventEmitter.on] fires when event is emitted', t => {
  const emiter = new EventEmitter();

  let n = 0;
  const cb = () => { n += 1; };
  const event = 'test';
  emiter.on(event, cb);
  emiter.emit(event, '');
  emiter.emit(event, '');

  t.equal(n, 2, 'fires event');

  t.end();
});
