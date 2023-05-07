export const click = (element: Element | null) =>
  element?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
