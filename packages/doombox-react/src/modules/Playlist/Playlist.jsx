import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// Core
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import { Typography } from '../../components';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Style
import { usePlaylistStyles } from './Playlist.style';

import PlaylistItem from './PlaylistItem.private';

const Playlist = () => {
  const { name, collection } = useAudio(HOOK.AUDIO.PLAYLIST);
  const { _id: current } = useAudio(HOOK.AUDIO.CURRENT);
  const { goTo } = useAudio(HOOK.AUDIO.METHOD);

  const classes = usePlaylistStyles();
  const theme = useTheme();

  const itemData = useMemo(() => ({
    current,
    collection,
    classes,
    goTo
  }), [classes, collection, current, goTo]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
      minHeight={0}
      width="100%"
    >
      <Box p={1}>
        <Typography
          variant="subtitle2"
          align="center"
          clamp={2}
        >
          {name}
        </Typography>
      </Box>
      <Box flexGrow={1} width="100%">
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              width={width}
              height={height}
              itemCount={collection.length}
              itemData={itemData}
              itemSize={theme.spacing(6)}
            >
              {PlaylistItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};

export default Playlist;
