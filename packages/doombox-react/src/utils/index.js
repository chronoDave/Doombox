// General
export const isDev = () => process.env.NODE_ENV === 'development';

export const isEmptyObj = obj => Object.keys(obj).length === 0;

export const normalizeUrl = url => url
  .replace(/#/g, '%23')
  .replace(/\\/g, '\\\\');

export const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
);

// Locale
export const languages = ['us', 'uk', 'nl'];
