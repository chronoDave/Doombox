const { JSDOM } = require('jsdom');
const forgo = require('forgo');

export const dom = new JSDOM();
export const window = dom.window;
export const document = dom.window.document;
export const MouseEvent = dom.window.MouseEvent;

forgo.setCustomEnv({
  window: dom.window,
  document: dom.window.document
});
