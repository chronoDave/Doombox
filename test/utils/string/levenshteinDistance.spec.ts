import test from 'tape';

import { levenshteinDistance } from 'src/utils/string';

test('[string.levenshteinDistance] shoud return levenshtein distance', t => {
  t.equal(
    levenshteinDistance(
      '[string.levenshteinDistance] shoud return levenshtein distance',
      'levenshteinDistance'
    ),
    43,
    'returns valid distance'
  );

  t.end();
});
