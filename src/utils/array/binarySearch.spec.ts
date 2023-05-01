import test from 'tape';

import { binarySearchLeft, binarySearchRight } from './binarySearch';

test('[binarySearchLeft] finds element', t => {
  const arr = [1, 2, 3, 5, 7, 9, 10];

  t.equal(
    binarySearchLeft(arr, 3),
    2,
    'returns index'
  );

  t.end();
});

test('[binarySearchLeft] finds leftmost duplicate', t => {
  const arr = [1, 2, 2, 2, 3, 5, 7, 9, 10];

  t.equal(
    binarySearchLeft(arr, 2),
    1,
    'returns duplicate index'
  );

  t.end();
});

test('[binarySearchRight] finds element', t => {
  const arr = [1, 2, 3, 5, 7, 9, 10];

  t.equal(
    binarySearchRight(arr, 3),
    2,
    'returns index'
  );

  t.end();
});

test('[binarySearchRight] finds leftmost duplicate', t => {
  const arr = [1, 2, 2, 2, 3, 5, 7, 9, 10];

  t.equal(
    binarySearchRight(arr, 2),
    3,
    'returns duplicate index'
  );

  t.end();
});
