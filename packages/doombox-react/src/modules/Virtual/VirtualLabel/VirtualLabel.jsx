import React, {
  Fragment,
  useState
} from 'react';
import { ACTION } from '@doombox/utils';
import groupBy from 'lodash.groupby';
import { useTranslation } from 'react-i18next';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import PropTypes from 'prop-types';

// Core
import { useTheme } from '@material-ui/core/styles';

import {
  Context,
  ContextItem,
  ContextDivider
} from '../../../components';

import VirtualScroller from '../VirtualScroller.private';
import VirtualLabelItem from './VirtualLabelItem.private';

// Actions
import {
  libraryActionPlaylist,
  createPlaylist
} from '../../../actions';

// Utils
import { formatTime } from '../../../utils';

// Style
import { useVirtualLabelStyles } from './VirtualLabel.style';

const VirtualLabel = ({ library, onScroll }) => {
  const [contextMenu, setContextMenu] = useState({});

  const theme = useTheme();
  const { t } = useTranslation();
  const classes = useVirtualLabelStyles();

  const dimensions = {
    width: theme.dimensions.label.item * 2 + theme.spacing(2),
    height: theme.dimensions.label.item + theme.spacing(2)
  };

  const actions = {
    menu: {
      ignore: true,
      tooltip: t('menu', { context: 'label' }),
      onClick: (event, playlist) => setContextMenu({
        anchorEl: event.currentTarget,
        playlist
      })
    },
    play: {
      tooltip: t('action:play', { context: 'label' }),
      onClick: playlist => libraryActionPlaylist(
        ACTION.AUDIO.PLAYLIST_SET,
        playlist,
        {
          sort: {
            'metadata.album': 1,
            'metadata.disk.no': 1,
            'metadata.track.no': 1
          }
        }
      )
    },
    add: {
      tooltip: t('action:add', { context: 'playlist' }),
      onClick: playlist => libraryActionPlaylist(
        ACTION.AUDIO.PLAYLIST_ADD,
        playlist,
        {
          sort: {
            'metadata.album': 1,
            'metadata.disk.no': 1,
            'metadata.track.no': 1
          }
        }
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
    dimensions,
    library: Object
      .values(groupBy(library, 'albumartist'))
      .reduce((acc, cur) => {
        const divider = [];
        const tracks = [];

        cur.forEach(collection => {
          if (collection.divider) {
            divider.push({
              divider: collection.divider,
              primary: collection.albumartist,
              secondary: [
                t('albumCount', { count: collection.albums }),
                t('trackCount', { count: collection.size }),
                formatTime(collection.duration, 'text')
              ].join(' \u2022 '),
              actions,
              tracks: collection.tracks
            });
          } else {
            tracks.push({
              cover: collection.cover,
              primary: collection.album,
              tracks: collection.tracks,
              tooltip: {
                album: t('action:play', { context: 'album' })
              },
              fields: [
                { key: t('release_year'), value: collection.year },
                { key: t('duration'), value: formatTime(collection.duration, 'text') },
                { key: t('tracks'), value: collection.tracks.length }
              ]
            });
          }
        });

        return [...acc, ...divider, tracks];
      }, [])
  };

  const getItemSize = (index, width) => {
    if (!itemData.library || !itemData.library[index]) return 0;
    if (!Array.isArray(itemData.library[index])) return 50;

    const albumCount = itemData.library[index].length;
    const containerWidth = width - theme.dimensions.scrollbar - theme.spacing(2);

    // Calculate #albums / row
    const rowCount = Math.floor(containerWidth / dimensions.width) || 1;
    // Calculate overflow / row
    const overflow = containerWidth - (dimensions.width * rowCount);
    const totalOferflow = Math.floor(albumCount / rowCount) * overflow;
    // Get combined width
    const totalWidth = albumCount * dimensions.width + totalOferflow;

    return Math.ceil(totalWidth / containerWidth) * dimensions.height;
  };

  return (
    <Fragment>
      <AutoSizer>
        {({ width, height }) => (
          <VirtualScroller
            updateDep={itemData.library}
            onScroll={onScroll}
            width={width}
          >
            <VariableSizeList
              // General
              width={width}
              height={height}
              // Items
              itemCount={itemData.library.length}
              itemData={itemData}
              itemSize={index => getItemSize(index, width)}
            >
              {VirtualLabelItem}
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

VirtualLabel.propTypes = {
  library: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      divider: PropTypes.string.isRequired,
      albumartist: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      tracks: PropTypes.arrayOf(PropTypes.string)
    }),
    PropTypes.shape({
      album: PropTypes.string.isRequired,
      albumartist: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      tracks: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ])).isRequired,
  onScroll: PropTypes.func.isRequired
};

export default VirtualLabel;
