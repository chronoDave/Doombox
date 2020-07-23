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

export const propFormat = PropTypes.shape({
  tagTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  lossless: PropTypes.bool.isRequired,
  container: PropTypes.string.isRequired,
  codec: PropTypes.string.isRequired,
  sampleRate: PropTypes.number.isRequired,
  numberOfChannels: PropTypes.number.isRequired,
  bitrate: PropTypes.number.isRequired,
  codecProfile: PropTypes.string.isRequired,
  tool: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired
});

export const propMetadata = PropTypes.shape({
  titlelocalized: PropTypes.string,
  artistlocalized: PropTypes.string,
  artistslocalized: PropTypes.arrayOf(PropTypes.string),
  albumlocalized: PropTypes.string,
  albumartistlocalized: PropTypes.string,
  cdid: PropTypes.string,
  date: PropTypes.string,
  track: PropTypes.shape({
    no: PropTypes.number,
    of: PropTypes.number
  }),
  disk: PropTypes.shape({
    no: PropTypes.number,
    of: PropTypes.number
  }),
  album: PropTypes.string,
  artists: PropTypes.arrayOf(PropTypes.string),
  artist: PropTypes.string,
  albumartist: PropTypes.string,
  comment: PropTypes.arrayOf(PropTypes.string),
  genre: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  year: PropTypes.number
});

export const propSong = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  format: propFormat,
  metadata: propMetadata
});
