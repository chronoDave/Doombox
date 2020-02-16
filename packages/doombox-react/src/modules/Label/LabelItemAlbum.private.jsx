import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import {
  Tooltip,
  Image,
  Typography,
  Table,
  TableRow
} from '../../components';

// Utils
import { formatTime } from '../../utils';
import {
  propSong,
  propSongImage
} from '../../utils/propTypes';

const LabelItemAlbum = props => {
  const {
    maxWidth,
    maxHeight,
    album,
    cover,
    songs,
    classes,
    onPlaylistPlay,
    t,
  } = props;

  const duration = songs
    .reduce((acc, cur) => acc + cur.format.duration || 0, 0);

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      p={1}
    >
      <Tooltip
        disableTranslation
        title={t('action:play', { context: 'album' })}
        arrow
      >
        <ButtonBase
          onClick={() => onPlaylistPlay({ name: album, collection: songs })}
          classes={{ root: classes.albumButton }}
        >
          <Image
            src={cover && cover.file}
            className={classes.albumImage}
            disableOverlay
          />
        </ButtonBase>
      </Tooltip>
      <Box
        flexGrow={1}
        pl={1.5}
        py={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Typography variant="subtitle2" clamp={2}>
          {album}
        </Typography>
        <Typography variant="caption" clamp={2}>
          {songs[0].metadata.artist}
        </Typography>
        <Table>
          <TableRow
            variant="caption"
            label={`${t('release', { context: 'year' })}:`}
            value={songs[0].metadata.year || t('unknown')}
          />
          <TableRow
            variant="caption"
            label={`${t('duration')}:`}
            value={formatTime(duration)}
          />
          <TableRow
            variant="caption"
            label={`${t('tracks')}:`}
            value={songs.length}
          />
        </Table>
      </Box>
    </Box>
  );
};

LabelItemAlbum.propTypes = {
  classes: PropTypes.shape({
    albumButton: PropTypes.string.isRequired,
    albumImage: PropTypes.string.isRequired
  }).isRequired,
  cover: propSongImage.isRequired,
  album: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(propSong).isRequired,
  maxWidth: PropTypes.number.isRequired,
  maxHeight: PropTypes.number.isRequired,
  onPlaylistPlay: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default LabelItemAlbum;
