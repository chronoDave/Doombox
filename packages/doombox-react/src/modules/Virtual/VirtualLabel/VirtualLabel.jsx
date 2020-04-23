import React, {
  Fragment,
  useState
} from 'react';
import { TYPE } from '@doombox/utils';
import groupBy from 'lodash.groupby';
import { useTranslation } from 'react-i18next';
import { VariableSizeList } from 'react-window';
import { connect } from 'react-redux';
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
  addLibrary,
  playLibrary,
  createPlaylist
} from '../../../actions';

// Utils
import { formatTime } from '../../../utils';

// Style
import { useVirtualLabelStyles } from './VirtualLabel.style';

const VirtualLabel = ({ library, localized, onScroll }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [playlist, setPlaylist] = useState({ id: null });

  const theme = useTheme();
  const { t } = useTranslation();
  const classes = useVirtualLabelStyles();

  const dimensions = {
    width: theme.dimensions.label.item * 2 + theme.spacing(2),
    height: theme.dimensions.label.item + theme.spacing(2)
  };

  const tooltip = {
    menu: t('menu', { context: 'label' }),
    play: t('action:play', { context: 'label' }),
    add: t('action:add', { context: 'playlist' }),
    favorite: t('action:create', { context: 'playlist' })
  };

  const itemData = {
    classes,
    dimensions,
    handleMenu: (anchor, payload) => {
      setAnchorEl(anchor);
      setPlaylist(payload);
    },
    library: Object
      .values(groupBy(library, 'albumartist'))
      .reduce((acc, cur) => {
        const divider = [];
        const tracks = [];

        cur.forEach(collection => {
          if (collection.divider) {
            divider.push({
              primary: collection.albumartist,
              secondary: [
                t('albumCount', { count: collection.albums }),
                t('trackCount', { count: collection.size }),
                formatTime(collection.duration, 'text')
              ].join(' \u2022 '),
              tooltip,
              tracks: collection.tracks
            });
          } else {
            tracks.push({
              cover: collection.cover,
              primary: localized ?
                (collection.albumlocalized || collection.album) :
                collection.album,
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
          <VirtualScroller onScroll={onScroll} width={width}>
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
      {/* Divider context menu */}
      <Context
        anchorEl={anchorEl}
        open={playlist.id === 'divider'}
        onClose={() => setPlaylist({ ...playlist, id: null })}
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
          onClick={() => createPlaylist(playlist)}
        />
      </Context>
      {/* Album context menu */}
      <Context
        anchorEl={anchorEl}
        open={playlist.id === 'album'}
        onClose={() => setPlaylist({ ...playlist, id: null })}
        position="right"
      >
        <ContextItem
          primary={tooltip.add}
          onClick={() => addLibrary(playlist)}
        />
        <ContextItem
          primary={tooltip.favorite}
          onClick={() => createPlaylist(playlist)}
        />
      </Context>
    </Fragment>
  );
};

VirtualLabel.propTypes = {
  localized: PropTypes.bool.isRequired,
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

const mapStateToProps = state => ({
  localized: state.config[TYPE.CONFIG.GENERAL].localized,
});

export default connect(
  mapStateToProps
)(VirtualLabel);
