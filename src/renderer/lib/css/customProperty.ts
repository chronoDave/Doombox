export default (x: string) =>
  window.getComputedStyle(document.body).getPropertyValue(`--${x}`);
