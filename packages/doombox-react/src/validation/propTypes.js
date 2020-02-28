import PropTypes from 'prop-types';

// Palette
export const propPaletteColor = PropTypes.shape({
  main: PropTypes.string.isRequired,
  dark: PropTypes.string.isRequired,
  light: PropTypes.string.isRequired,
  contrastText: PropTypes.string.isRequired
});

export const propPaletteGrey = PropTypes.shape({
  light: PropTypes.string.isRequired,
  dark: PropTypes.string.isRequired
});

export const propPaletteRamp = PropTypes.shape({
  50: PropTypes.number.isRequired,
  100: PropTypes.number.isRequired,
  200: PropTypes.number.isRequired,
  300: PropTypes.number.isRequired,
  400: PropTypes.number.isRequired,
  500: PropTypes.number.isRequired,
  600: PropTypes.number.isRequired,
  700: PropTypes.number.isRequired,
  800: PropTypes.number.isRequired,
  900: PropTypes.number.isRequired,
});

export const propPalette = PropTypes.shape({
  darkTheme: PropTypes.bool.isRequired,
  backgroundOpacity: PropTypes.bool.isRequired,
  primary: propPaletteColor,
  secondary: propPaletteColor,
  error: propPaletteColor,
  warning: propPaletteColor,
  success: propPaletteColor,
  info: propPaletteColor,
  grey: propPaletteGrey,
  ramp: propPaletteRamp
});

// Song
export const propSongImage = PropTypes.shape({
  _id: PropTypes.string,
  path: PropTypes.string,
  picture: PropTypes.string,
  description: PropTypes.string
});

export const propSongFormat = PropTypes.shape({
  tagTypes: PropTypes.arrayOf(PropTypes.string),
  lossless: PropTypes.bool,
  container: PropTypes.string,
  codec: PropTypes.string,
  sampleRate: PropTypes.number,
  numberOfChannels: PropTypes.number,
  bitrate: PropTypes.number,
  codecProfile: PropTypes.string,
  numberOfSamples: PropTypes.number,
  duration: PropTypes.number
});

export const propSongNoOf = PropTypes.shape({
  no: PropTypes.number,
  of: PropTypes.number
});

export const propSongMetadata = PropTypes.shape({
  track: propSongNoOf,
  disk: propSongNoOf,
  album: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(PropTypes.string),
  artist: PropTypes.string.isRequired,
  albumartist: PropTypes.string.isRequired,
  comment: PropTypes.arrayOf(PropTypes.string),
  genre: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
});

export const propSong = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(propSongImage),
  file: PropTypes.string.isRequired,
  format: propSongFormat.isRequired,
  metadata: propSongMetadata.isRequired
});

// Playlist
export const propPlaylist = PropTypes.shape({
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  collection: PropTypes.arrayOf(PropTypes.string).isRequired
});

// Album
export const propAlbum = PropTypes.shape({
  album: PropTypes.string.isRequired,
  cover: propSongImage,
  songs: PropTypes.arrayOf(propSong)
});

// Label
export const propLabel = PropTypes.shape({
  albumartist: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(propAlbum)
});

// Virtual
export const propVirtualAction = PropTypes.shape({
  tooltip: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
});
