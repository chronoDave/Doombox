import React, {
  useEffect,
  Fragment,
  useState,
  useMemo,
  createRef,
  useCallback
} from 'react';
import { TYPE } from '@doombox/utils';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { useTheme } from '@material-ui/core/styles';

import {
  Context,
  ContextItem
} from '../../components';

// Redux
import {
  setPlaylist as dispatchSetPlaylist,
  addPlaylist as dispatchAddPlaylist
} from '../../redux';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useLibraryStyles } from './Library.style';

import LibraryItem from './LibraryItem.private';

const Library = props => {
  const {
    // Config
    reverseScroll,
    dense,
    // Library
    size,
    offset,
    hasMore,
    pending,
    library,
    // Func
    setPlaylist,
    addPlaylist,
    onScroll
  } = props;
  const ref = createRef();

  const [scroll, setScroll] = useState(null);
  const [menu, setMenu] = useState({});

  const { createSong } = useAudio(HOOK.AUDIO.METHOD);
  const { _id: current } = useAudio(HOOK.AUDIO.CURRENT);

  const theme = useTheme();
  const classes = useLibraryStyles();
  const { t } = useTranslation();

  const itemSize = theme.spacing(dense ? 6 : 7);

  useEffect(() => {
    if (
      ref.current &&
      scroll &&
      scroll.length !== library.length &&
      !pending
    ) {
      if (scroll.direction === 'backward') {
        ref.current.scrollTo(library.length * itemSize - ref.current.props.height - 1);
        setScroll(null);
      }
      if (scroll.direction === 'forward') {
        ref.current.scrollTo(1);
        setScroll(null);
      }
    }
  }, [ref, pending, scroll, library.length, itemSize]);

  const handleScroll = ({ scrollDirection, scrollOffset }) => {
    if (!ref.current || pending || library.length === 0 || size <= library.length) return;

    // Scroll up
    if (
      (offset !== 0 || reverseScroll) &&
      scrollDirection === 'backward' &&
      scrollOffset === 0
    ) {
      setScroll({ direction: scrollDirection, length: library.length });
      onScroll({ direction: scrollDirection, offset });
    }

    // Scroll down
    if (
      (hasMore || reverseScroll) &&
      scrollDirection === 'forward' &&
      scrollOffset === library.length * itemSize - ref.current.props.height
    ) {
      setScroll({ direction: scrollDirection, length: library.length });
      onScroll({ direction: scrollDirection, offset });
    }
  };

  const handlePlaylistPlay = useCallback(playlist => {
    setPlaylist(playlist);
    setMenu({ anchor: null });
  }, [setPlaylist]);

  const handlePlaylistAdd = useCallback(collection => {
    addPlaylist(collection);
    setMenu({ anchor: null });
  }, [addPlaylist]);

  const handleMenu = (event, playlist) => {
    setMenu({ anchor: event.currentTarget, playlist });
  };

  const itemData = useMemo(() => ({
    // General
    classes,
    current,
    library,
    dense,
    // Func
    createSong,
    handleMenu,
    handlePlaylistAdd,
    handlePlaylistPlay,
    t
  }), [
    classes,
    current,
    library,
    dense,
    createSong,
    handlePlaylistAdd,
    handlePlaylistPlay,
    t
  ]);

  return (
    <Fragment>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            // General
            width={width}
            height={height}
            onScroll={handleScroll}
            ref={ref}
            // Items
            itemCount={library.length}
            itemData={itemData}
            itemSize={itemSize}
          >
            {LibraryItem}
          </FixedSizeList>
        )}
      </AutoSizer>
      <Context
        anchorEl={menu.anchor}
        onClose={() => setMenu({ ...menu, anchor: null })}
        position="bottom"
      >
        <ContextItem
          disableTranslation
          primary={t('action:play', { context: 'album' })}
          onClick={() => handlePlaylistPlay(menu.playlist)}
        />
        <ContextItem
          disableTranslation
          primary={t('action:add', { context: 'playlist' })}
          onClick={() => handlePlaylistAdd(menu.playlist.collection)}
        />
      </Context>
    </Fragment>
  );
};

Library.propTypes = {
  // Func
  setPlaylist: PropTypes.func.isRequired,
  addPlaylist: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
  // Library
  offset: PropTypes.number.isRequired,
  pending: PropTypes.bool.isRequired,
  library: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hasMore: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  // Config
  dense: PropTypes.bool.isRequired,
  reverseScroll: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  // Library
  offset: state.library.offset,
  pending: state.library.pending,
  library: state.library.collection,
  hasMore: state.library.hasMore,
  size: state.library.size,
  // Config
  dense: state.config[TYPE.CONFIG.GENERAL].dense,
  reverseScroll: state.config[TYPE.CONFIG.GENERAL].reverseScroll
});

const mapDispatchToProps = {
  setPlaylist: dispatchSetPlaylist,
  addPlaylist: dispatchAddPlaylist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
