const values = {
  xs: 320,
  sm: 480,
  md: 720,
  lg: 960,
  xl: 1280
};

const queries = {
  minWidth: 'min-width',
  minHeight: 'min-height',
  maxWidth: 'max-width',
  maxHeight: 'max-height'
};

export default {
  values,
  queries,
  create: (query, value) => {
    if (process.env.NODE_ENV === 'development') {
      const createError = (type, expected, actual) => {
        console.error(
          `Invalid breakpoint ${type} \`${expected}\`, expected one of: ${Object.keys(actual).join(', ')}`,
          `\n${new Error().stack.match(/\(.*\)/g)[2]}`
        );
      };

      if (!queries[query]) createError('query', query, queries);
      if (!values[value]) createError('value', value, values);
    }

    return `@media (${queries[query]}: ${values[value] - (query.includes('max') ? 1 : 0)}px)`;
  },
  join: (...args) => `@media ${args
    .map(breakpoint => breakpoint.replace(/@media\s/, ''))
    .join(' and ')}`
};
