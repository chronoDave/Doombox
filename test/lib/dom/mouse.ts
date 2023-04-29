export const click = (element: Element) =>
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
