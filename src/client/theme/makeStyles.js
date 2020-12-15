import { css } from 'emotion';
import { capitalize } from '@doombox-utils';

// Hooks
import { useTheme } from '../hooks';

export default (styles, label) => props => {
  if (process.env.NODE_ENV && !label) {
    console.warn('Missing label at', new Error().stack.split('at ')[2].trim());
  }

  const theme = useTheme();
  return Object
    .entries(styles(theme))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: css({
        ...(typeof value === 'function' ? value(props) : value),
        label: label ? `${label}${capitalize(key)}` : key
      })
    }), {});
};
