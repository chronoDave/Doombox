const create = args => args.join('_');

module.exports = {
  create,
  // Types
  USER: 'USER',
  USER_CACHE: 'USER_CACHE',
  IMAGE: 'IMAGE',
  CONNECTION: 'CONNECTION',
  CONNECTION_CACHE: 'CONNECTION_CACHE',
  LIBRARY: 'LIBRARY',
  MESSAGE: 'MESSAGE',
  // Actions
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  COUNT: 'COUNT',
  // Async
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};
