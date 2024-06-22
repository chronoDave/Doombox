import test from 'tape';

import Stack from './stack';

test('[stack.push] adds to stack', t => {
  const stack = new Stack(3);

  stack.push(1);
  t.equal(stack.size, 1, 'adds to stack');

  t.end();
});

test('[stack.push] loops when max size is exceeded', t => {
  const stack = new Stack(2);

  stack
    .push(1) // [1, null]
    .push(2) // [1, 2]
    .push(3); // [3, 2]

  t.equal(stack.size, 2, 'does not exceed max size');
  t.deepEqual(
    [stack.peek(0), stack.peek(1)],
    [3, 2],
    'wraps'
  );

  t.end();
});

test('[stack.pop] removes from stack', t => {
  const stack = new Stack(2);

  stack
    .push(1)
    .pop();

  t.equal(stack.size, 0, 'removes from stack');
  t.equal(stack.peek(0), null, 'removes from stack');

  t.end();
});

test('[stack.size] returns stack size', t => {
  const stack = new Stack(1);

  t.equal(stack.size, 0, 'empty stack');
  stack.push(1);
  t.equal(stack.size, 1, 'pushed stack');
  stack.pop();
  t.equal(stack.size, 0, 'popped stack');
  stack.push(1).push(2);
  t.equal(stack.size, 1, 'pushed wrapped stack');
  stack.pop();
  t.equal(stack.size, 0, 'popped wrapped stack');

  t.end();
});
