// General
const cleanFileName = string => string
  .replace(/\/|\\|\*|\?|"|:|<|>|\.|\|/g, '_');
const arrayToObject = (key, array) => array
  .reduce((acc, cur) => ({
    ...acc,
    [cur[key]]: { ...cur }
  }), {});
const stripKeys = object => Object.keys(object)
  .filter(key => !(object[key] === undefined || object[key] === null))
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: object[cur]
  }), {});
const toArray = item => (Array.isArray(item) ? item : [item]);

// RegExp
const escapeRegExp = expression => expression
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/**
 * @param {Object} payload
 * @param {String} payload.key - Database key
 * @param {String} payload.expression - RegExp expression
 */
const createQueryRegExp = ({ key, expression }) => ({
  [key]: { $regex: new RegExp(escapeRegExp(expression), 'i') }
});

// Library
const populateImages = (collection, images) => collection
  .map(song => ({
    ...song,
    images: song.images ? song.images.map(id => images[id]) : []
  }));

module.exports = {
  arrayToObject,
  stripKeys,
  cleanFileName,
  createQueryRegExp,
  populateImages,
  toArray,
  escapeRegExp
};
