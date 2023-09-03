import test from 'tape';

import { escape, shiftTab, tab } from '../../../../test/lib/dom/keyboard';

import focusTrap from './focusTrap';
import fixture from './focusTrap.fixture';

test('[focusTrap] should trap focus', t => {
  const cleanup = fixture();

  const container = document.querySelector<HTMLElement>('.container');
  if (!container) throw new Error('Invalid element');

  focusTrap(container, {
    onEscape: () => {}
  });

  tab(container);
  tab(container);
  tab(container);

  t.equal(
    document.activeElement,
    document.getElementById('1'),
    'traps focus forwards'
  );

  shiftTab(container);

  t.equal(
    document.activeElement,
    document.getElementById('2'),
    'traps focus backwards'
  );

  cleanup();
  t.end();
});

test('[focusTrap] adds Escape listener', t => {
  const cleanup = fixture();

  const container = document.querySelector<HTMLElement>('.container');
  if (!container) throw new Error('Invalid element');

  let n = 0;
  focusTrap(container, {
    onEscape: () => { n += 1; }
  });

  escape(container);

  t.equal(n, 1, 'fires escape event');

  cleanup();
  t.end();
});
