import test from 'tape';

import freeze from './freeze';

test('[freeze] deep freezes object', t => {
  const o = freeze({ a: false, b: { c: 2 }, d: null });

  try {
    // @ts-expect-error: Readonly assignment
    o.a = true;
  } catch (err) {
    t.pass('throws on top level assignment');
  }

  try {
    // @ts-expect-error: Readonly assignment
    o.b.c = 1;
  } catch (err) {
    t.pass('throws on nested assignment');
  }

  try {
    // @ts-expect-error: Readonly assignment
    o.c = 3;
  } catch (err) {
    t.pass('throws on new attribute assignment');
  }

  t.end();
});
