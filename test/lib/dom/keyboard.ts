export const dispatchKeyboardEvent = (options: KeyboardEventInit) =>
  (element: Element | null) =>
    element?.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      ...options
    }));

export const tab = dispatchKeyboardEvent({ key: 'Tab' });
export const shiftTab = dispatchKeyboardEvent({ key: 'Tab', shiftKey: true });
export const escape = dispatchKeyboardEvent({ key: 'Escape' });
