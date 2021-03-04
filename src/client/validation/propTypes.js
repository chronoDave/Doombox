import { CONFIG } from '@doombox-config';
import { WINDOW } from '@doombox-utils/types';
import PropTypes from 'prop-types';

const createConfigShape = (key, type) => PropTypes.shape(
  Object
    .keys(CONFIG[key])
    .reduce((acc, property) => ({
      ...acc,
      [property]: type
    }), {})
);

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

export const propTablePairs = PropTypes.arrayOf(PropTypes.shape({
  key: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}));

export const propVirtualStyle = PropTypes.shape({
  position: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired
});

export const propTabSearch = PropTypes.oneOf([
  WINDOW.TABS.SONGS,
  WINDOW.TABS.ALBUMS,
  WINDOW.TABS.LABELS
]);

export const propConfigSearch = createConfigShape('search', PropTypes.bool);
export const propConfigKeybinds = createConfigShape('keybinds', PropTypes.string);

export const propPopperPlacement = PropTypes.oneOf([
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end'
]);

export const propAnchorEl = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.instanceOf(Element) })
]);

export const propImage = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  files: PropTypes.shape({
    original: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }).isRequired,
  type: PropTypes.string,
  description: PropTypes.string
});

export const propSong = PropTypes.shape({
  file: PropTypes.string.isRequired,
  images: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(propImage)
  ]).isRequired,
  _albumId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  _labelId: PropTypes.string.isRequired,
  // Metadata
  artist: PropTypes.string,
  title: PropTypes.string,
  album: PropTypes.string,
  albumartist: PropTypes.string,
  publisher: PropTypes.string,
  track: PropTypes.arrayOf(PropTypes.number),
  disc: PropTypes.arrayOf(PropTypes.number),
  year: PropTypes.number,
  artistlocalized: PropTypes.string,
  titlelocalized: PropTypes.string,
  albumlocalized: PropTypes.string,
  albumartistlocalized: PropTypes.string,
  publisherlocalized: PropTypes.string,
  date: PropTypes.string,
  event: PropTypes.string,
  genre: PropTypes.string,
  cdid: PropTypes.string
});

export const propAlbum = PropTypes.shape({
  albumartist: PropTypes.string,
  album: PropTypes.string,
  albumartistlocalized: PropTypes.string,
  albumlocalized: PropTypes.string,
  cdid: PropTypes.string,
  images: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(propImage)
  ]).isRequired,
  date: PropTypes.string,
  duration: PropTypes.number,
  songs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(propSong)
  ]).isRequired,
  year: PropTypes.number,
  _id: PropTypes.string.isRequired
});

export const propLabel = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  albums: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(propAlbum)
  ]).isRequired,
  duration: PropTypes.number,
  publisher: PropTypes.string,
  publisherlocalized: PropTypes.string,
  songs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(propSong)
  ]).isRequired,
});

export const propPlaylist = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  collection: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(propSong)
  ]).isRequired,
});
