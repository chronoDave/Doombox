import { useState, useLayoutEffect } from 'react';

import { getMediaQuery, Breakpoint } from '../theme/breakpoints';

export default (query?: Breakpoint.Queries, value?: Breakpoint.Keys) => {
  const [isMatch, setMatch] = useState(false);

  useLayoutEffect(() => {
    if (!query || !value) return;

    const getMatch = () => setMatch(getMediaQuery(query, value));

    getMatch();
    window.addEventListener('resize', getMatch);

    return () => window.removeEventListener('resize', getMatch);
  }, [query, value]);

  return isMatch;
};
