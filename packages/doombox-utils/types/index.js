const createType = args => args.join('_');

module.exports = {
  createType,
  // Action types
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  COUNT: 'COUNT',
  VALIDATE: 'VALIDATE',
  // Async types
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  // Module types
  USER: 'USER',
  IMAGE: 'IMAGE',
  LIBRARY: 'LIBRARY',
  SONG: 'SONG',
  SCAN: 'SCAN',
  // System types
  CACHE: 'CACHE',
  REMOTE: 'REMOTE',
  CONNECTION: 'CONNECTION'
};
