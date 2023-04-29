const forgo = require('forgo');
const { JSDOM } = require('jsdom');

export const dom = new JSDOM();
export const window = dom.window;
export const document = dom.window.document;
export const MouseEvent = dom.window.MouseEvent;
export const AbortController = dom.window.AbortController;

forgo.setCustomEnv({
  window: dom.window,
  document: dom.window.document
});
