import React, { useMemo } from 'react';

// Icon
import IconImage from '@material-ui/icons/Image';

// Core
import { Box } from '@material-ui/core';

import { useAudio } from '../../components/Provider';

// Utils
import { cleanUrl } from '../../utils';

// Style
import { usePlaylistStyle } from './Playlist.style';

const PlaylistCurrent = () => {
  const {
    image: { path },
    current: { album }
  } = useAudio();
  const classes = usePlaylistStyle();

  return useMemo(() => (path ? (
    <img
      src={cleanUrl(path)}
      alt={`${album || '???'} album cover`}
      className={classes.image}
    />
  ) : (
    <Box
      height="360px"
      width="360px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="grey.500"
      borderRadius="borderRadius"
    >
      <IconImage />
    </Box>
  )), [path, album]);
};

export default PlaylistCurrent;
