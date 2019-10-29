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
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired
    })
  ),
});

export const propError = PropTypes.shape({
  message: PropTypes.string.isRequired,
  trace: PropTypes.string
});

export const propTableStyle = PropTypes.shape({
  height: PropTypes.number,
  left: PropTypes.number,
  position: PropTypes.string,
  top: PropTypes.number,
  width: PropTypes.string
});

export const propOptions = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]).isRequired,
    t: PropTypes.func
  }))
]);

export const propSong = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired
  )
});

export const propCache = PropTypes.shape({
  _id: PropTypes.string.isRequired
});

export const propPlaylist = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: propImage,
  songs: PropTypes.arrayOf(PropTypes.string.isRequired)
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
