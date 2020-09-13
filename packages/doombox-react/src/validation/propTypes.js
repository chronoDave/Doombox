import PropTypes from 'prop-types';

export const propTheme = PropTypes.shape({
  variant: PropTypes.oneOf(['light', 'dark']),
  grey: PropTypes.shape({
    50: PropTypes.string.isRequired,
    100: PropTypes.string.isRequired,
    200: PropTypes.string.isRequired,
    300: PropTypes.string.isRequired,
    400: PropTypes.string.isRequired,
    500: PropTypes.string.isRequired,
    600: PropTypes.string.isRequired,
    700: PropTypes.string.isRequired,
    800: PropTypes.string.isRequired,
    900: PropTypes.string.isRequired
  })
});
