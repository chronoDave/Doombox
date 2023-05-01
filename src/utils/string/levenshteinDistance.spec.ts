import test from 'tape';

import levenshteinDistance from './levenshteinDistance';

test('[levenshteinDistance] calculates deletion / insertion', t => {
  t.equal(
    levenshteinDistance('distance', 'dist'),
    4,
    'calculates insertion / deletion'
  );

  t.end();
});

test('[levenshteinDistance] calculates substitution', t => {
  t.equal(
    levenshteinDistance('sit', 'fit'),
    1,
    'calculates substitution'
  );

  t.end();
});

test('[levenshteinDistance] calculates distance', t => {
  t.equal(
    levenshteinDistance('kitten', 'sitting'),
    3,
    'calculates distance'
  );

  t.end();
});
