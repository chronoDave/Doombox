const { Application } = require('spectron');
const electronPath = require('electron');
const { ELEMENT_IDS } = require('@doombox/utils/const');
const path = require('path');
const { assert } = require('chai');

// Utils
const {
  validateClient,
  validateElementById
} = require('./utils');

const appPath = path.resolve(__dirname, '../src');

// eslint-disable-next-line func-names
describe('Starts application', function () {
  this.timeout(10000);

  const app = new Application({
    path: electronPath,
    args: [appPath]
  });

  beforeEach(() => (app.isRunning() ? app.restart() : app.start()));

  it('renders', () => validateClient(app));

  it('is minimizable', async () => {
    await app.client.waitUntilWindowLoaded();

    validateElementById(app.client, ELEMENT_IDS.WINDOW_MINIMIZE);

    await app.client.click(`#${ELEMENT_IDS.WINDOW_MINIMIZE}`);

    const isMinimized = await app.browserWindow.isMinimized();

    assert.isTrue(isMinimized, 'Window not minimized');
  });

  it('is maximizable', async () => {
    await app.client.waitUntilWindowLoaded();

    validateElementById(app.client, ELEMENT_IDS.WINDOW_MAXIMIZE);

    await app.client.click(`#${ELEMENT_IDS.WINDOW_MAXIMIZE}`);

    const isMaximized = await app.browserWindow.isMaximized();

    assert.isTrue(isMaximized, 'Window not maximized');

    await app.client.click(`#${ELEMENT_IDS.WINDOW_MAXIMIZE}`);

    const isNormal = await app.browserWindow.isNormal();

    assert.isTrue(isNormal, 'Window not normalized');
  });

  it('is closeable', async () => {
    await app.client.waitUntilWindowLoaded();

    validateElementById(app.client, ELEMENT_IDS.WINDOW_CLOSE);

    await app.client.click(`#${ELEMENT_IDS.WINDOW_CLOSE}`);

    const windowCount = await app.client.getWindowCount();

    assert.equal(windowCount, 0);
  });
});
