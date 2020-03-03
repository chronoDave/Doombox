const mockEvent = callback => ({
  sender: {
    send: callback
  }
});

module.exports = {
  mockEvent
};
