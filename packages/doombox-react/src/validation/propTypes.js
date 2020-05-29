import PropTypes from 'prop-types';

export const propTheme = PropTypes.shape({
  variant: PropTypes.oneOf(['light', 'dark']).isRequired,
  grey: PropTypes.shape({
    light: PropTypes.string.isRequired,
    dark: PropTypes.string.isRequired
  }).isRequired,
  ramp: PropTypes.shape({
    50: PropTypes.number.isRequired,
    100: PropTypes.number.isRequired,
    200: PropTypes.number.isRequired,
    300: PropTypes.number.isRequired,
    400: PropTypes.number.isRequired,
    500: PropTypes.number.isRequired,
    600: PropTypes.number.isRequired,
    700: PropTypes.number.isRequired,
    800: PropTypes.number.isRequired,
    900: PropTypes.number.isRequired
  }).isRequired
});
