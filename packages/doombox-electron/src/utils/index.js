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

/**
 * @param {Object} logic
 * @param {String} logic.operator - Logical operator. Currently supports: `or`, `and`
 * @param {string[]} logic.expressions - Array of expressions.
 * - Uses { key: '', expression: '' } format.
 */
const createLogicQuery = ({ operator, expressions }) => {
  if (!['or', 'and'].includes(operator)) throw new Error(`Invalid operator: ${operator}`);
  if (!Array.isArray(expressions)) throw new Error(`${JSON.stringify(expressions)} is not an array`);
  return ({
    [`$${operator}`]: expressions.map(({ key, expression }) => ({
      [key]: { $regex: new RegExp(expression, 'i') }
    }))
  });
};

module.exports = {
  arrayToObject,
  stripKeys,
  cleanFileName,
  createLogicQuery
};
