import test from 'tape';

import { click } from '../../../../../test/lib/dom/mouse';

import fixture from './menu.fixture';

test('[menu] should open menu on click', t => {
  const cleanup = fixture();

  const menuButton = document.querySelector('button');

  t.equal(document.querySelectorAll('[role=menuitem]').length, 0, 'does not have menu');
  click(menuButton);
  t.notEqual(document.querySelectorAll('[role=menuitem]').length, 0, 'has menu');

  cleanup();
  t.end();
});

test('[menu] should close menu if clicked again', t => {
  const cleanup = fixture();

  const menuButton = document.querySelector('button');

  click(menuButton);
  click(menuButton);
  t.equal(document.querySelectorAll('[role=menuitem]').length, 0, 'does not have menu');

  cleanup();
  t.end();
});

test('[menu] should close menu if clicked again', t => {
  const cleanup = fixture();

  const menuButton = document.querySelector('button');

  click(menuButton);
  click(menuButton);
  t.equal(document.querySelectorAll('[role=menuitem]').length, 0, 'does not have menu');

  cleanup();
  t.end();
});

test('[menu] should close menu if clicked outside area', t => {
  const cleanup = fixture();

  const menuButton = document.querySelector('button');
  const outsideArea = document.querySelector('#test');

  click(menuButton);
  click(outsideArea);
  t.equal(document.querySelectorAll('[role=menuitem]').length, 0, 'does not have menu');

  cleanup();
  t.end();
});

test('[menu] should close menu if item is clicked', t => {
  const cleanup = fixture();

  const menuButton = document.querySelector('button');

  click(menuButton);
  click(document.querySelectorAll('[role=menuitem]')[0]);

  t.equal(document.querySelectorAll('[role=menuitem]').length, 0, 'does not have menu');

  cleanup();
  t.end();
});

test('[menu] should not close menu if item has "disableAutoclose"', t => {
  const cleanup = fixture();

  const menuButton = document.querySelector('button');

  click(menuButton);
  click(document.querySelectorAll('[role=menuitem]')[1]);
  t.notEqual(document.querySelectorAll('[role=menuitem]'), 0, 'has menu');

  cleanup();
  t.end();
});
