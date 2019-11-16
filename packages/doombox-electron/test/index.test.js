/* eslint-disable func-names */
const electronPath = require('electron');
const { Application } = require('spectron');
const { assert } = require('chai');
const path = require('path');

// Utils
const { validateElementById } = require('./utils');

const rootDir = path.resolve(__dirname, '../src');

describe('Application launch', function () {
  this.timeout(10000);

  const app = new Application({
    path: electronPath,
    args: [rootDir]
  });

  before(() => app.start());

  it('opens initial window', async () => {
    await app.client.waitUntilWindowLoaded();
    const windowCount = await app.client.getWindowCount();

    assert.equal(windowCount, 1);
  });

  it('is a valid window', async () => {
    const bounds = await app.browserWindow.getBounds();

    assert.isAbove(bounds.width, 0, 'Width not above 0');
    assert.isAbove(bounds.height, 0, 'Height not above 0');
  });

  it('renders client', async () => {
    validateElementById(app.client, '#root');
  });

  it('is minimizable', async () => {
    const id = '#window-minimize';

    validateElementById(app.client, id);

    await app.client.click(id);
    const isMinimized = await app.browserWindow.isMinimized();

    assert.isTrue(isMinimized, 'Window not minimized');

    await app.browserWindow.restore();
  });

  it('is maximizable', async () => {
    const id = '#window-maximize';

    validateElementById(app.client, id);

    await app.client.click(id);
    const isMaximized = await app.browserWindow.isMaximized();

    assert.isTrue(isMaximized, 'Window not maximized');

    await app.client.click(id);
    const isNormal = await app.browserWindow.isNormal();

    assert.isTrue(isNormal, 'Window not normalized');
  });

  it('is closable', async () => {
    const id = '#window-close';

    validateElementById(app.client, id);

    await app.client.click(id);

    let windowCount;
    try {
      windowCount = await app.client.getWindowCount();
    } catch (err) {
      windowCount = 0;
    }

    assert.equal(windowCount, 0);
  });
});
