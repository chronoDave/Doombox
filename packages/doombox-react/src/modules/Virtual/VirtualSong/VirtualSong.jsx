import React, {
  Fragment,
  useState
} from 'react';
import { TYPE } from '@doombox/utils';
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
  playLibrary,
  addLibrary,
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [playlist, setPlaylist] = useState({ name: '' });

  const theme = useTheme();
  const classes = useVirtualSongStyles();
  const { t } = useTranslation();

  const { createSong } = useAudio(HOOK.AUDIO.METHOD);
  const { _id: currentId } = useAudio(HOOK.AUDIO.CURRENT);

  const tooltip = {
    menu: t('menu', { context: 'album' }),
    play: t('action:play', { context: 'album' }),
    add: t('action:add', { context: 'playlist' }),
    favorite: t('action:create', { context: 'playlist' })
  };

  const itemData = {
    classes,
    dense,
    current: currentId,
    createSong,
    handleMenu: (anchor, payload) => {
      setAnchorEl(anchor);
      setPlaylist(payload);
    },
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
            tooltip,
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

  const renderContext = () => (
    <Fragment>
      <Context
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        position="bottom"
      >
        <ContextItem
          primary={tooltip.play}
          onClick={() => playLibrary(playlist)}
        />
        <ContextItem
          primary={tooltip.add}
          onClick={() => addLibrary(playlist)}
        />
        <ContextDivider />
        <ContextItem
          primary={tooltip.favorite}
          onClick={() => createPlaylist({
            name: playlist.name,
            cover: playlist.cover,
            collection: playlist.collection
          })}
        />
      </Context>
    </Fragment>
  );

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
      {renderContext()}
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
