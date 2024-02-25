import test from 'tape';

import { click } from '../../../../test/lib/dom/mouse';

import clickAwayListener from './clickAwayListener';
import fixture from './clickAwayListener.fixture';

test('[clickAwayListener] should fire event if clicked outside element', t => {
  const cleanup = fixture();
  let clicked = false;

  const text = document.querySelector('p');
  const button = document.querySelector('button');

  clickAwayListener(text, () => { clicked = true; });
  click(button);

  t.true(clicked);

  cleanup();
  t.end();
});

test('[clickAwayListener] should not fire event if clicked inside element', t => {
  const cleanup = fixture();
  let clicked = false;

  const button = document.querySelector('button');

  clickAwayListener(button, () => { clicked = true; });
  click(button);

  t.false(clicked);

  cleanup();
  t.end();
});

test('[clickAwayListener] should remove event listener if clicked outside element', t => {
  const cleanup = fixture();
  let clicked = false;

  const text = document.querySelector('p');
  const button = document.querySelector('button');

  clickAwayListener(text, () => { clicked = !clicked; });
  click(button);
  click(button);

  t.true(clicked);

  cleanup();
  t.end();
});

test('[clickAwayListener] should not remove event listener if clicked inside element', t => {
  const cleanup = fixture();
  let clicked = false;

  const text = document.querySelector('p');
  const button = document.querySelector('button');

  clickAwayListener(button, () => { clicked = true; });
  click(button);
  click(text);

  t.true(clicked);

  cleanup();
  t.end();
});

test('[clickAwayListener] should return cleanup function', t => {
  const cleanup = fixture();
  let clicked = false;

  const text = document.querySelector('p');
  const button = document.querySelector('button');

  const removeClickAwayListener = clickAwayListener(text, () => { clicked = true; });
  removeClickAwayListener();
  click(button);

  t.false(clicked);

  cleanup();
  t.end();
});
