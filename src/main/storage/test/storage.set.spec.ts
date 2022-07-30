import test from 'tape';

import Storage from '../storage';

test('[storage.set] should update value', t => {
  const storage = new Storage({
    root: __dirname,
    name: 'storage',
    shape: { a: 1 }
  });

  const value = 3;
  storage.set('a', value);
  // @ts-ignore
  t.equal(storage._data.a, value, 'sets value');

  t.end();
});

test('[storage.set] should be immutable', t => {
  const storage = new Storage({
    root: __dirname,
    name: 'storage',
    shape: { a: { b: 1 } }
  });

  const value = { b: 3 };
  storage.set('a', value);
  value.b = 6;
  // @ts-ignore
  t.notEqual(storage._data.a.b, value.b, 'sets value');

  t.end();
});
