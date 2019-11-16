const { assert } = require('chai');

const validateElementById = async (client, id) => {
  const hasElement = await client.isExisting(id);
  assert.isTrue(hasElement, `Element with id: ${id} does not exist`);
};

module.exports = {
  validateElementById
};
