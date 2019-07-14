// General
export const isDev = () => process.env.NODE_ENV === 'development';
export const isEmptyObj = obj => Object.keys(obj).length === 0;
export const languages = ['us', 'uk', 'nl'];
export const normalizeUrl = url => url
  .replace(/#/g, '%23')
  .replace(/\\/g, '\\\\');
