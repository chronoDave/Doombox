import React, { useMemo } from 'react';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components/Typography';
import { useAudio } from '../../components/Provider';

const PlaylistDescription = () => {
  const {
    current: {
      title,
      artist,
      album,
      albumartist,
      year
    }
  } = useAudio();

  return useMemo(() => (
    <Box display="flex" flexDirection="column" pt={1}>
      <Box
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        width="360px"
      >
        <Typography variant="h5" noWrap>
          {title || '???'}
        </Typography>
        <Typography>
          {year || '???'}
        </Typography>
      </Box>
      <Typography>
        {artist || '???'}
      </Typography>
      <Typography>
        {album || '???'}
      </Typography>
      <Typography>
        {albumartist || '???'}
      </Typography>
    </Box>
  ), [title, artist, album, albumartist, year]);
};

export default PlaylistDescription;
