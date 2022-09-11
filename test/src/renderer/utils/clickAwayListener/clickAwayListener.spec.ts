import test from 'tape';

import clickAwayListener from '../../../../../src/renderer/utils/clickAwayListener';
import { click } from '../../utils';

import fixture from './fixture';

test('[clickAwayListener] should fire event if clicked outside element', t => {
  const { cleanup, button, text } = fixture();
  let clicked = false;

  clickAwayListener(text, () => { clicked = true; });
  click(button);

  t.true(clicked);

  cleanup();
  t.end();
});

test('[clickAwayListener] should not fire event if clicked inside element', t => {
  const { cleanup, button } = fixture();
  let clicked = false;

  clickAwayListener(button, () => { clicked = true; });
  click(button);

  t.false(clicked);

  cleanup();
  t.end();
});

test('[clickAwayListener] should remove event listener if clicked outside element', t => {
  const { cleanup, button, text } = fixture();
  let clicked = false;

  clickAwayListener(text, () => { clicked = !clicked; });
  click(button);
  click(button);

  t.true(clicked);

  cleanup();
  t.end();
});

test('[clickAwayListener] should not remove event listener if clicked inside element', t => {
  const { cleanup, button, text } = fixture();
  let clicked = false;

  clickAwayListener(button, () => { clicked = true; });
  click(button);
  click(text);

  t.true(clicked);

  cleanup();
  t.end();
});

test('[clickAwayListener] should return cleanup function', t => {
  const { cleanup, button, text } = fixture();
  let clicked = false;

  const removeClickAwayListener = clickAwayListener(text, () => { clicked = true; });
  removeClickAwayListener();
  click(button);

  t.false(clicked);

  cleanup();
  t.end();
});