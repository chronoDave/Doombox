import React, {
  Fragment,
  useState
} from 'react';
import {
  ACTION,
  TYPE
} from '@doombox/utils';
import { VariableSizeList } from 'react-window';
import { useTranslation } from 'react-i18next';
import AutoSizer from 'react-virtualized-auto-sizer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { useTheme } from '@material-ui/core/styles';

import {
  Context,
  ContextItem
} from '../../../components';

// Actions
import { libraryActionPlaylist } from '../../../actions';

// Hooks
import { useAudio } from '../../../hooks';

// Utils
import {
  formatTime,
  sortTracksTrack
} from '../../../utils';
import { HOOK } from '../../../utils/const';
import { propSong } from '../../../utils/propTypes';

// Styles
import { useVirtualSongStyles } from './VirtualSong.style';

import VirtualScroller from '../VirtualScroller.private';
import VirtualSongItem from './VirtualSongItem.private';

const VirtualSong = ({ library, onScroll, dense }) => {
  const [contextMenu, setContextMenu] = useState({});

  const theme = useTheme();
  const classes = useVirtualSongStyles();
  const { t } = useTranslation();

  const { createSong } = useAudio(HOOK.AUDIO.METHOD);
  const { _id: currentId } = useAudio(HOOK.AUDIO.CURRENT);

  const itemData = {
    classes,
    dense,
    current: currentId,
    createSong,
    library: library
      .map(item => {
        if (item.divider === 'album') {
          return ({
            divider: item.divider,
            primary: item.album,
            secondary: [
              item.albumartist,
              item.year,
              t('trackCount', { count: item.size }),
              formatTime(item.duration, 'text')
            ].join(' \u2022 '),
            tooltip: {
              play: t('action:play', { context: 'album' }),
              add: t('action:add', { context: 'playlist' })
            },
            handler: {
              context: (event, playlist) => setContextMenu({
                anchor: event.currentTarget,
                playlist
              })
            },
            tracks: item.tracks
          });
        }
        if (item.divider === 'disc') {
          return ({
            divider: item.divider,
            primary: t('discCount', { count: item.no })
          });
        }
        return item.sort(sortTracksTrack);
      })
      .flat()
  };

  const getItemSize = index => {
    const item = itemData.library[index];

    if (item.divider === 'album') return theme.spacing(dense ? 6 : 7);
    if (item.divider === 'disc') return theme.spacing(dense ? 2 : 3);
    return theme.spacing(dense ? 6.5 : 7);
  };

  const handleContextMenu = action => {
    libraryActionPlaylist(action, contextMenu.playlist);
    setContextMenu({ ...contextMenu, anchor: null });
  };

  return (
    <Fragment>
      <AutoSizer>
        {({ width, height }) => (
          <VirtualScroller updateDep={itemData.library} onScroll={onScroll}>
            <VariableSizeList
              // General
              width={width}
              height={height}
              initialScrollOffset={1}
              // Items
              itemCount={itemData.library.length}
              itemData={itemData}
              itemSize={index => getItemSize(index)}
            >
              {VirtualSongItem}
            </VariableSizeList>
          </VirtualScroller>
        )}
      </AutoSizer>
      <Context
        anchorEl={contextMenu.anchor}
        onClose={() => setContextMenu({ ...contextMenu, anchor: null })}
        position="bottom"
      >
        <ContextItem
          disableTranslation
          onClick={() => handleContextMenu(ACTION.AUDIO.PLAYLIST_SET)}
          primary={t('action:play', { context: 'album' })}
        />
        <ContextItem
          disableTranslation
          onClick={() => handleContextMenu(ACTION.AUDIO.PLAYLIST_ADD)}
          primary={t('action:add', { context: 'playlist' })}
        />
      </Context>
    </Fragment>
  );
};

VirtualSong.propTypes = {
  dense: PropTypes.bool.isRequired,
  onScroll: PropTypes.func.isRequired,
  library: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      divider: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      albumartist: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
      tracks: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    PropTypes.shape({
      divider: PropTypes.string.isRequired,
      no: PropTypes.number.isRequired
    }),
    PropTypes.arrayOf(propSong)
  ])).isRequired
};

const mapStateToProps = state => ({
  dense: state.config[TYPE.CONFIG.GENERAL].dense,
});

export default connect(
  mapStateToProps
)(VirtualSong);
