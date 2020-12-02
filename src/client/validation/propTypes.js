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

export const propMetadata = PropTypes.shape({
  album: PropTypes.string.isRequired,
  albumartist: PropTypes.string.isRequired,
  albumartistlocalized: PropTypes.string,
  albumlocalized: PropTypes.string,
  artist: PropTypes.string.isRequired,
  artistlocalized: PropTypes.string,
  cdid: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.string,
  disc: PropTypes.shape({
    no: PropTypes.number,
    of: PropTypes.number
  }),
  title: PropTypes.string.isRequired,
  titlelocalized: PropTypes.string,
  track: PropTypes.shape({
    no: PropTypes.number,
    of: PropTypes.number
  }),
  year: PropTypes.number
});

export const propSong = PropTypes.shape({
  file: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  metadata: propMetadata,
  _albumId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  _labelId: PropTypes.string.isRequired
});
