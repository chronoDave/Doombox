import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useTranslation } from 'react-i18next';

// Core
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import {
  Tooltip,
  Typography
} from '../../../components';

// Hooks
import { useAudio } from '../../../hooks';

// Utils
import { formatTime } from '../../../utils';
import { HOOK } from '../../../utils/const';

// Style
import { useVirtualStyles } from '../Virtual.style';

import VirtualPlaylistItem from './VirtualPlaylistItem.private';

const Playlist = () => {
  const { name, collection } = useAudio(HOOK.AUDIO.PLAYLIST);
  const { _id: currentId } = useAudio(HOOK.AUDIO.CURRENT);
  const { goTo } = useAudio(HOOK.AUDIO.METHOD);

  const theme = useTheme();
  const size = 6.5;

  const classes = useVirtualStyles({ size });
  const { t } = useTranslation();

  const itemData = useMemo(() => ({
    currentId,
    collection,
    classes,
    goTo
  }), [classes, collection, currentId, goTo]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
      minHeight={0}
      width="100%"
    >
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width="100%"
      >
        <Tooltip
          title={name}
          disableTranslation
          placement="right"
        >
          <Typography
            variant="subtitle2"
            align="center"
            noWrap
          >
            {name}
          </Typography>
        </Tooltip>
        {useMemo(() => (
          <Typography
            variant="caption"
            align="center"
            noWrap
          >
            {`${t('trackCount', { count: collection.length })} - ${formatTime(collection.reduce((acc, cur) => acc + cur.format.duration || 0, 0), 'text')}`}
          </Typography>
        ), [collection.length])}
      </Box>
      <Box flexGrow={1} width="100%">
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              width={width}
              height={height}
              itemCount={collection.length}
              itemData={itemData}
              itemSize={theme.spacing(size)}
            >
              {VirtualPlaylistItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};

export default Playlist;
