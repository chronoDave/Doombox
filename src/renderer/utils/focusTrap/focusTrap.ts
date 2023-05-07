import { tabbable } from 'tabbable';

import { IS_JSDOM } from '../../../utils/const';

export type FocusTrapOptions = {
  onescape: (event: KeyboardEvent) => void
};

export default (element: HTMLElement, options: FocusTrapOptions) => {
  const { signal, abort } = new AbortController();
  const elements = tabbable(element, {
    displayCheck: IS_JSDOM ? 'none' : 'non-zero-area'
  });

  const first = elements[0];
  const last = elements[Math.max(0, elements.length - 1)];

  element.addEventListener('keydown', event => {
    if (event.key === 'Escape') options.onescape(event);
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === first) last.focus();
      if (!event.shiftKey && document.activeElement === last) first.focus();
    }
  }, { signal });

  first.focus();
  return abort;
};
