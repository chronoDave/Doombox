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
    const _query = queries[query] || query;
    const _value = values[value] || value;

    return `@media (${_query}: ${_value - (_query.includes('max') ? 1 : 0)}px)`;
  },
  join: (...args) => `@media ${args
    .map(breakpoint => breakpoint.replace(/@media\s/, ''))
    .join(' and ')}`
};
