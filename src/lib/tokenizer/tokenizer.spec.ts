import test from 'tape';

import fixture from './tokenizer.fixture';

test('[tokenizer.tokenize] tokenizes kanji', async t => {
  const tokenizer = await fixture();

  t.true(
    Array.isArray(tokenizer.tokenize('祖堅')),
    'is array'
  );

  t.true(
    tokenizer.tokenize('祖堅').every(x => typeof x === 'string'),
    'is string array'
  );

  t.end();
});
