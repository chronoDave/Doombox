import test from 'tape';

import { click } from '../../utils';

import fixture from './fixture';

test('[menu] should open menu on click', t => {
  const { menuButton, cleanup, hasMenuItems } = fixture();

  t.false(hasMenuItems(), 'does not have menu');
  click(menuButton);
  t.true(hasMenuItems(), 'has menu');

  cleanup();
  t.end();
});

test('[menu] should close menu if clicked again', t => {
  const { menuButton, cleanup, hasMenuItems } = fixture();

  click(menuButton);
  click(menuButton);
  t.false(hasMenuItems(), 'does not have menu');

  cleanup();
  t.end();
});

test('[menu] should close menu if clicked again', t => {
  const { menuButton, cleanup, hasMenuItems } = fixture();

  click(menuButton);
  click(menuButton);
  t.false(hasMenuItems(), 'does not have menu');

  cleanup();
  t.end();
});

test('[menu] should close menu if clicked outside area', t => {
  const {
    menuButton,
    cleanup,
    outsideArea,
    hasMenuItems
  } = fixture();

  click(menuButton);
  click(outsideArea);
  t.false(hasMenuItems(), 'does not have menu');

  cleanup();
  t.end();
});

test('[menu] should close menu if item is selected', t => {
  const {
    menuButton,
    cleanup,
    getMenuItems,
    hasMenuItems
  } = fixture();

  click(menuButton);
  click(getMenuItems()[0]);
  t.false(hasMenuItems(), 'does not have menu');

  cleanup();
  t.end();
});

test('[menu] should not close menu if item has "disableAutoclose"', t => {
  const {
    menuButton,
    cleanup,
    getMenuItems,
    hasMenuItems
  } = fixture();

  click(menuButton);
  click(getMenuItems()[1]);
  t.false(hasMenuItems(), 'does not have menu');

  cleanup();
  t.end();
});
