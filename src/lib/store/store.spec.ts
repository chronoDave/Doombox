import test from 'tape';

import Store from './store';

test('[store] listens and dispatches', t => {
  const state = { x: 1 };
  const store = new Store(state);

  store
    .on((cur, prev) => {
      t.pass('listens to dispatch');
      t.deepEqual(cur, { x: 2 }, 'updates state');
      t.deepEqual(prev, state, 'returns previous state');
      t.end();
    })
    .set(() => ({ x: 2 }));
});

test('[store] removes listeners', t => {
  let x = 1;
  const store = new Store({ x });

  const subscriber = () => {
    x += 1;
  };

  store
    .on(subscriber)
    .off(subscriber)
    .on(() => {
      t.equal(x, 1, 'does not fire event');
      t.end();
    })
    .set(() => ({ x }));
});
