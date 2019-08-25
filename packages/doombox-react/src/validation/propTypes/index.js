import PropTypes from 'prop-types';
import { GREY } from '../../theme/colors';

export const propImage = PropTypes.shape({
  lastModified: PropTypes.number.isRequired,
  lastModifiedDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
});

export const propUser = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  rtl: PropTypes.bool,
  avatar: propImage,
  background: propImage,
  library: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired
  })),
});

export const propColors = PropTypes.oneOf([
  'initial',
  'inherit',
  'primary',
  'secondary',
  'textPrimary',
  'textSecondary',
  'error',
  'warning',
  'success',
  'info',
].concat(Object.keys(GREY).map(key => `grey.${key}`)));
