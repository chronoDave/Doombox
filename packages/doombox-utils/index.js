const isDev = () => process.env.NODE_ENV === 'development';

// Generate a pseudo-random id
const generateToken = () => `${process.pid.toString(16)}${Date.now().toString(16)}`;

module.exports = {
  isDev,
  generateToken
};
