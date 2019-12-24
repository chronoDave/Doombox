import React, { useMemo } from 'react';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// Core
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Typography
} from '@material-ui/core';

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

  const calculateItemSize = index => {
    const { metadata } = collection[index];
    let height = 7.5;

    if (metadata.title.length > 12) height += 2;
    if (metadata.artist.length > 12) height += 2;

    return theme.spacing(height);
  };

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
          classes={{ root: classes.noWrap }}
        >
          {name}
        </Typography>
      </Box>
      <Box flexGrow={1} width="100%">
        <AutoSizer>
          {({ width, height }) => (
            <VariableSizeList
              width={width}
              height={height}
              itemCount={collection.length}
              itemData={itemData}
              itemSize={calculateItemSize}
            >
              {PlaylistItem}
            </VariableSizeList>
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};

export default Playlist;
