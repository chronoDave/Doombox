import { useMemo } from 'react';
import { css } from 'emotion';
import { capitalize } from '@doombox-utils';

// Hooks
import { useTheme } from '../hooks';

export default (styles, label) => props => {
  if (process.env.NODE_ENV === 'development' && !label) {
    console.warn('Missing label at', new Error().stack.match(/\(.*\)/g)[2]);
  }

  const theme = useTheme();

  return useMemo(() => Object
    .entries(styles(theme))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: css({
        ...(typeof value === 'function' ? value(props) : value),
        label: label ? `${label}${capitalize(key)}` : key
      })
    }), {}), [theme, props]);
};
