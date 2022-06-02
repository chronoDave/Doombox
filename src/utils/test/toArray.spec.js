const test = require('tape');

const { toArray } = require('..');

test('[toArray] casts value to array', t => {
  const values = [
    1,
    '1',
    {}
  ];

  for (let i = 0; i < values.length; i += 1) {
    t.true(
      Array.isArray(toArray(values[i])),
      `${typeof values[i]} is array`
    );
  }

  t.end();
});
