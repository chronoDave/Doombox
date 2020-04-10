import React, {
  Fragment,
  useState
} from 'react';
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
  addLibrary,
  playLibrary,
  createPlaylist
} from '../../../actions';

// Utils
import { formatTime } from '../../../utils';

// Style
import { useVirtualLabelStyles } from './VirtualLabel.style';

const VirtualLabel = ({ library, onScroll }) => {
  const [menuDivider, setMenuDivider] = useState({ anchorEl: null, data: null });
  const [menuAlbum, setMenuAlbum] = useState({ anchorEl: null, data: null });

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
              handleMenu: payload => setMenuDivider({
                ...menuDivider,
                ...payload
              }),
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
              handleMenu: payload => setMenuAlbum({
                ...menuAlbum,
                ...payload
              }),
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
        anchorEl={menuDivider.anchorEl}
        onClose={() => setMenuDivider({ ...menuDivider, anchorEl: null })}
        position="bottom"
      >
        <ContextItem
          disableTranslation
          primary={tooltip.play}
          onClick={() => playLibrary(menuDivider.data)}
        />
        <ContextItem
          disableTranslation
          primary={tooltip.add}
          onClick={() => addLibrary(menuDivider.data)}
        />
        <ContextDivider />
        <ContextItem
          disableTranslation
          primary={tooltip.favorite}
          onClick={() => createPlaylist(menuDivider.data)}
        />
      </Context>
      {/* Album context menu */}
      <Context
        anchorEl={menuAlbum.anchorEl}
        onClose={() => setMenuAlbum({ ...menuAlbum, anchorEl: null })}
        position="right"
      >
        <ContextItem
          disableTranslation
          primary={tooltip.add}
          onClick={() => addLibrary(menuAlbum.data)}
        />
        <ContextItem
          disableTranslation
          primary={tooltip.favorite}
          onClick={() => createPlaylist(menuAlbum.data)}
        />
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
