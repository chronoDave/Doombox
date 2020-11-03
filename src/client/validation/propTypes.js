import { CONFIG } from '@doombox-config';
import PropTypes from 'prop-types';

export const propKeybinds = PropTypes.shape(
  Object
    .keys(CONFIG.keybinds)
    .reduce((acc, key) => ({
      ...acc,
      [key]: PropTypes.string
    }), {})
);

export const propCover = PropTypes.shape({
  file: PropTypes.string.isRequired
});

export const propAnchorEl = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.instanceOf(Element) })
]);
