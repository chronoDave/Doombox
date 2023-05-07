const forgo = require('forgo');
const { JSDOM } = require('jsdom');

const dom = new JSDOM(undefined, { pretendToBeVisual: true });

global.window = dom.window;
global.document = dom.window.document;
global.AbortController = dom.window.AbortController;
global.MouseEvent = dom.window.MouseEvent;

forgo.setCustomEnv({
  window: dom.window,
  document: dom.window.document
});
