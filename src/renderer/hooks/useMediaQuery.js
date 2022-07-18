import { useState, useLayoutEffect } from 'react';

const breakpoints = {
  values: {
    xs: 320,
    sm: 480,
    md: 720,
    lg: 960,
    xl: 1280
  },
  queries: {
    minWidth: 'min-width',
    minHeight: 'min-height',
    maxWidth: 'max-width',
    maxHeight: 'max-height'
  },
  create: (query, value) => {
    const _query = breakpoints.queries[query] || query;
    const _value = breakpoints.values[value] || value;

    return `@media (${_query}: ${_value - (_query.includes('max') ? 1 : 0)}px)`;
  },
  join: (...args) => `@media ${args
    .map(breakpoint => breakpoint.replace(/@media\s/, ''))
    .join(' and ')}`
};

export default query => {
  const [matches, setMatches] = useState(false);

  useLayoutEffect(() => {
    const getMatch = () => setMatches((
      window
        .matchMedia(query(breakpoints).replace(/@media/g, ''))
        .matches
    ));

    getMatch();
    window.addEventListener('resize', getMatch);

    return () => window.removeEventListener('resize', getMatch);
  }, [query]);

  return matches;
};
