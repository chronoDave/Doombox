const sinon = require('sinon');

const createMockEvent = () => ({
  sender: {
    send: sinon.spy()
  }
});
module.exports = {
  createMockEvent
};
