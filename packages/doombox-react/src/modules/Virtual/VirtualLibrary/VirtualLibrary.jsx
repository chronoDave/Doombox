import React, {
  Fragment,
  useState,
  useMemo
} from 'react';
import { TYPE } from '@doombox/utils';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { useTheme } from '@material-ui/core/styles';

import {
  Context,
  ContextItem,
  ContextMenu,
} from '../../../components';

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

const VirtualLibrary = ({ library }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [album, setAlbum] = useState(null);

  const { _id: current } = useAudio(HOOK.AUDIO.CURRENT);
  const {
    createSong,
    setPlaylist,
    addPlaylist
  } = useAudio(HOOK.AUDIO.METHOD);
  const { getImageById } = useIpc(HOOK.IPC.METHOD);
  const config = useIpc(HOOK.IPC.CONFIG);

  const dense = config[TYPE.CONFIG.SEARCH][TYPE.OPTIONS.DENSE];
  const size = dense ? 6 : 7;

  const theme = useTheme();
  const classes = useVirtualStyles({
    size,
    src: getImageById(album && album.collection[0].images[0]).path
  });
  const { t } = useTranslation();

  const itemData = useMemo(() => ({
    // Style
    classes,
    current,
    dense,
    library,
    // Func
    createSong,
    setAnchorEl,
    setAlbum,
    setPlaylist,
    addPlaylist,
    t
  }), [
    classes,
    current,
    dense,
    library,
    createSong,
    setAnchorEl,
    setAlbum,
    setPlaylist,
    addPlaylist,
    t
  ]);

  return (
    <Fragment>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            width={width}
            height={height}
            itemCount={library.length}
            itemData={itemData}
            itemSize={theme.spacing(size)}
          >
            {VirtualLibraryItem}
          </FixedSizeList>
        )}
      </AutoSizer>
      <Context
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        position="bottom"
      >
        <ContextItem
          disableTranslation
          primary={t('action:play', { context: 'album' })}
          onClick={() => {
            setPlaylist(album.name, album.collection);
            createSong();
          }}
        />
        <ContextItem
          disableTranslation
          primary={t('action:add', { context: 'playlist' })}
          onClick={() => addPlaylist(album.collection)}
        />
      </Context>
    </Fragment>
  );
};

VirtualLibrary.propTypes = {
  library: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default VirtualLibrary;
