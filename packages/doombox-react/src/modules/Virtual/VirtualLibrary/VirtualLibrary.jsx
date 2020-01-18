import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import { TYPE } from '@doombox/utils';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import groupby from 'lodash.groupby';

// Core
import { useTheme } from '@material-ui/core/styles';

// Hooks
import {
  useAudio,
  useIpc
} from '../../../hooks';

// Utils
import { HOOK } from '../../../utils/const';

// Styles
import { useVirtualStyles } from '../Virtual.style';

import VirtualLibraryItem from './VirtualLibraryItem.private';

// Utils
import { formatTime } from '../../../utils';

const groupByAlbum = library => Object
  .entries(groupby(library, 'metadata.album'))
  .sort((a, b) => {
    const aMetadata = a[1][0].metadata.albumartist;
    const bMetadata = b[1][0].metadata.albumartist;

    if (aMetadata < bMetadata) return -1;
    if (aMetadata > bMetadata) return 1;
    return 0;
  })
  .map(([album, values]) => [
    {
      divider: {
        primary: album,
        secondary: [
          values[0].metadata.albumartist,
          values[0].metadata.year,
          `${values.length} tracks`,
          formatTime(
            values.reduce((acc, cur) => acc + cur.format.duration, 0),
            'text'
          )
        ].join(' \u2022 ')
      },
    },
    ...values
      .sort((a, b) => a.metadata.track.no - b.metadata.track.no)
  ])
  .flat();

const VirtualLibrary = () => {
  const [collection, setCollection] = useState([]);

  const library = useAudio(HOOK.AUDIO.LIBRARY);
  const { _id: current } = useAudio(HOOK.AUDIO.CURRENT);
  const { createSong } = useAudio(HOOK.AUDIO.METHOD);
  const { search } = useIpc(HOOK.IPC.CONFIG);
  const theme = useTheme();
  const classes = useVirtualStyles();

  useEffect(() => {
    setCollection(groupByAlbum(library));
  }, [library]);

  const itemData = useMemo(() => ({
    current,
    classes,
    createSong,
    dense: search[TYPE.OPTIONS.DENSE],
    collection
  }), [collection, current, classes, search]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList
          width={width}
          height={height}
          itemCount={collection.length}
          itemData={itemData}
          itemSize={theme.spacing(search[TYPE.OPTIONS.DENSE] ? 5 : 7)}
        >
          {VirtualLibraryItem}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default VirtualLibrary;
