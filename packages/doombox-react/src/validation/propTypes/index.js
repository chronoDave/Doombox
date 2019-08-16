import PropTypes from 'prop-types';

export const propImage = PropTypes.shape({
  lastModified: PropTypes.number.isRequired,
  lastModifiedDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
});

export const propUser = PropTypes.shape({
  avatar: propImage,
  background: propImage,
  language: PropTypes.string.isRequired,
  library: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired
  })),
  username: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
});
