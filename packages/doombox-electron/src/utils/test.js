const { assert } = require('chai');

const validateElementById = async (client, id) => {
  const hasElement = await client.isExisting(`#${id}`);

  assert.isTrue(hasElement, `Element with id: ${id} does not exist`);
};

const validateClient = async app => {
  await app.client.waitUntilWindowLoaded();

  const windowCount = await app.client.getWindowCount();

  assert.equal(windowCount, 1);

  const bounds = await app.browserWindow.getBounds();

  assert.isAbove(bounds.width, 0, 'Width not above 0');
  assert.isAbove(bounds.height, 0, 'Height not above 0');

  return validateElementById(app.client, 'root');
};

module.exports = {
  validateElementById,
  validateClient
};
