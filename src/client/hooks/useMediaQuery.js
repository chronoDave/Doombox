import { useState, useLayoutEffect } from 'react';

import { useTheme } from './useContext';

export default query => {
  const [matches, setMatches] = useState(false);

  const theme = useTheme();

  useLayoutEffect(() => {
    const getMatch = () => setMatches(window
      .matchMedia(query(theme.breakpoints).replace(/@media/g, ''))
      .matches);

    getMatch();
    window.addEventListener('resize', getMatch);

    return () => window.removeEventListener('resize', getMatch);
  }, [query, theme]);

  return matches;
};
