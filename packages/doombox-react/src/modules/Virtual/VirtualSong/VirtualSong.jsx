import React, {
  Fragment,
  useState
} from 'react';
import {
  TYPE,
  ACTION
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
  ContextItem,
  ContextDivider
} from '../../../components';

import VirtualScroller from '../VirtualScroller.private';
import VirtualSongItem from './VirtualSongItem.private';

// Actions
import {
  libraryActionPlaylist,
  createPlaylist
} from '../../../actions';

// Hooks
import { useAudio } from '../../../hooks';

// Utils
import {
  formatTime,
  sortTrackNo
} from '../../../utils';
import { HOOK } from '../../../utils/const';

// Validation
import { propSong } from '../../../validation/propTypes';

// Styles
import { useVirtualSongStyles } from './VirtualSong.style';

const VirtualSong = ({ library, onScroll, dense }) => {
  const [contextMenu, setContextMenu] = useState({
    anchorEl: null,
    playlist: null
  });

  const theme = useTheme();
  const classes = useVirtualSongStyles();
  const { t } = useTranslation();

  const { createSong } = useAudio(HOOK.AUDIO.METHOD);
  const { _id: currentId } = useAudio(HOOK.AUDIO.CURRENT);

  const actions = {
    menu: {
      ignore: true,
      tooltip: t('menu', { context: 'album' }),
      onClick: (event, playlist) => setContextMenu({
        anchorEl: event.currentTarget,
        playlist
      })
    },
    play: {
      tooltip: t('action:play', { context: 'album' }),
      onClick: playlist => libraryActionPlaylist(
        ACTION.AUDIO.PLAYLIST_SET,
        playlist
      )
    },
    add: {
      tooltip: t('action:add', { context: 'playlist' }),
      onClick: playlist => libraryActionPlaylist(
        ACTION.AUDIO.PLAYLIST_ADD,
        playlist
      )
    },
    divider: 'divider',
    favorite: {
      tooltip: t('action:create', { context: 'playlist' }),
      onClick: createPlaylist
    }
  };

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
            cover: item.cover,
            secondary: [
              item.albumartist,
              item.year,
              t('trackCount', { count: item.size }),
              formatTime(item.duration, 'text')
            ].join(' \u2022 '),
            actions,
            tracks: item.tracks
          });
        }
        if (item.divider === 'disc') {
          return ({
            divider: item.divider,
            primary: t('discCount', { count: item.no })
          });
        }
        return item.sort(sortTrackNo);
      })
      .flat()
  };

  const getItemSize = index => {
    const item = itemData.library[index];

    if (item.divider === 'album') return theme.spacing(dense ? 6 : 7);
    if (item.divider === 'disc') return theme.spacing(dense ? 2 : 3);
    return theme.spacing(dense ? 6.5 : 7);
  };

  return (
    <Fragment>
      <AutoSizer>
        {({ width, height }) => (
          <VirtualScroller onScroll={onScroll}>
            <VariableSizeList
              // General
              width={width}
              height={height}
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
        anchorEl={contextMenu.anchorEl}
        onClose={() => setContextMenu({ ...contextMenu, anchorEl: null })}
        position="bottom"
      >
        {Object.entries(actions).map(([key, action]) => {
          if (action.ignore) return null;
          if (key === 'divider') return <ContextDivider key={key} />;
          return (
            <ContextItem
              key={key}
              disableTranslation
              primary={action.tooltip}
              onClick={action.onClick}
            />
          );
        })}
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
