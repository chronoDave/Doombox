const sinon = require('sinon');

const createMockElectronEvent = () => ({
  sender: {
    send: sinon.spy()
  }
});
module.exports = {
  createMockElectronEvent
};
