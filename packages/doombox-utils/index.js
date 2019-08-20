const isDev = () => process.env.NODE_ENV === 'development';
const isWin = () => process.platform === 'win32';

module.exports = {
  isDev,
  isWin
};
