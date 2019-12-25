import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import groupby from 'lodash.groupby';

// Core
import { useTheme } from '@material-ui/core/styles';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useVirtualStyles } from './Virtual.style';

import LibraryItem from './VirtualLibraryItem';

const groupByAlbum = library => Object
  .entries(groupby(library, 'metadata.album'))
  .map(([key, values]) => [
    {
      title: `${values[0].metadata.albumartist} - ${key}`
    },
    ...values
  ])
  .flat();

const VirtualLibrary = () => {
  const [collection, setCollection] = useState([]);

  const library = useAudio(HOOK.AUDIO.LIBRARY);
  const { _id: current } = useAudio(HOOK.AUDIO.CURRENT);
  const { createSong } = useAudio(HOOK.AUDIO.METHOD);
  const theme = useTheme();
  const classes = useVirtualStyles();

  useEffect(() => {
    setCollection(groupByAlbum(library));
  }, [library]);

  const itemData = useMemo(() => ({
    current,
    classes,
    createSong,
    collection
  }), [collection, current, classes]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList
          width={width}
          height={height}
          itemCount={collection.length}
          itemData={itemData}
          itemSize={theme.spacing(7)}
        >
          {LibraryItem}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default VirtualLibrary;
