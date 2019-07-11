module.exports = {
  asyncActionPending: type => `${type}_PENDING`,
  asyncActionSuccess: type => `${type}_SUCCESS`,
  asyncActionError: type => `${type}_ERROR`
};
