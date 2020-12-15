import { CONFIG } from '@doombox-config';
import PropTypes from 'prop-types';

export const propTypographyVariants = PropTypes.oneOf([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body',
  'subtitle',
  'caption'
]);

export const propVirtualStyle = PropTypes.shape({
  position: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired
});

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

export const propMetadata = PropTypes.shape({
  artist: PropTypes.string,
  title: PropTypes.string,
  album: PropTypes.string,
  albumartist: PropTypes.string,
  track: PropTypes.arrayOf(PropTypes.number),
  disc: PropTypes.arrayOf(PropTypes.number),
  year: PropTypes.number,
  artistlocalized: PropTypes.string,
  titlelocalized: PropTypes.string,
  albumlocalized: PropTypes.string,
  albumartistlocalized: PropTypes.string,
  date: PropTypes.string,
  event: PropTypes.string,
  genre: PropTypes.string,
  cdid: PropTypes.string
});

export const propSong = PropTypes.shape({
  file: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  metadata: propMetadata,
  _albumId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  _labelId: PropTypes.string.isRequired
});

export const propAlbum = PropTypes.shape({
  artist: PropTypes.string,
  album: PropTypes.string,
  artistlocalized: PropTypes.string,
  albumlocalized: PropTypes.string,
  cdid: PropTypes.string,
  covers: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.string,
  duration: PropTypes.number,
  songs: PropTypes.arrayOf(PropTypes.string),
  year: PropTypes.number,
  _id: PropTypes.string.isRequired
});

export const propLabel = PropTypes.shape({
  albums: PropTypes.arrayOf(PropTypes.string),
  duration: PropTypes.number,
  label: PropTypes.string,
  labellocalized: PropTypes.string,
  songs: PropTypes.arrayOf(PropTypes.string),
  _id: PropTypes.string
});
