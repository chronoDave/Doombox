const test = require('tape');

const { generateUid } = require('..');

test('[generateUid] generates unique ID\'s', t => {
  const limit = 10000;
  const ids = [];

  for (let i = 0; i < limit; i += 1) {
    ids.push(generateUid());
  }

  t.equal(
    new Set(ids).size,
    limit,
    'array only contains unique id\'s'
  );

  t.end();
});

test('[generateUid] generates the same ID\'s based on seed', t => {
  const limit = 10000;
  const ids = [];

  for (let i = 0; i < limit; i += 1) {
    ids.push(generateUid(limit.toString()));
  }

  t.equal(
    new Set(ids).size,
    1,
    'array only contains non-unique id\'s'
  );

  t.end();
});
