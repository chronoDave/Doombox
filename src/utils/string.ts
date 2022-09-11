import crypto from 'crypto';

export const generateId = () => [
  Date.now().toString(16),
  crypto.randomBytes(4).toString('hex')
].join('');
