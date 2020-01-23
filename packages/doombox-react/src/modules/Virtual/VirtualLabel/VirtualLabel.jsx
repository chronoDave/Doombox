import React, {
  useMemo,
  useRef,
  useEffect
} from 'react';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { useTheme } from '@material-ui/core/styles';

import VirtualLabelItem from './VirtualLabelItem.private';

// Hooks
import { useAudio } from '../../../hooks';

// Utils
import { HOOK } from '../../../utils/const';

// Styles
import { useVirtualStyles } from '../Virtual.style';

const VirtualLabel = ({ labels }) => {
  const theme = useTheme();
  const labelRef = useRef();
  const classes = useVirtualStyles({ size: 1 });

  const { t } = useTranslation();
  const {
    createSong,
    setPlaylist,
    addPlaylist
  } = useAudio(HOOK.AUDIO.METHOD);

  const handleResize = debounce(() => labelRef.current.resetAfterIndex(0), 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (labelRef && labelRef.current) {
      labelRef.current.resetAfterIndex(0);
    }
  }, [labelRef, labels]);

  const itemDimensions = {
    width: theme.dimensions.label.item * 2.5 + theme.spacing(2),
    height: theme.dimensions.label.item + theme.spacing(2),
    divider: theme.dimensions.label.divider + theme.spacing(),
    horizontal: 2
  };

  const itemData = useMemo(() => ({
    labels,
    itemDimensions,
    classes,
    onAlbumPlay: (title, collection) => {
      setPlaylist(title, collection);
      createSong();
    },
    onLabelAdd: addPlaylist,
    onLabelPlay: (title, collection) => {
      setPlaylist(title, collection);
      createSong();
    },
    t
  }), [
    labels,
    classes,
    t
  ]);

  const getItemSize = (index, width) => {
    const label = labels[index];
    const labelSize = label.albums.length;

    const containerWidth =
      width -
      theme.dimensions.scrollbar -
      theme.spacing(itemDimensions.horizontal * 2);
    // Calculate how many albums can fit in a single row, should always be bigger than 0
    const rowCount = Math.floor(containerWidth / itemDimensions.width) || 1;
    // Calculate the row offset between the total row width and the screen width
    const offset = containerWidth - (itemDimensions.width * rowCount);
    // Total offset is equal to the row offset multiplied by the amount of expected columns
    const totalOffset = Math.floor(labelSize / rowCount) * offset;
    const totalWidth = labelSize * itemDimensions.width + totalOffset;

    const columns = Math.ceil(totalWidth / containerWidth);

    return (columns * itemDimensions.height) + itemDimensions.divider;
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <VariableSizeList
          // General
          width={width}
          height={height}
          // Item
          itemCount={labels.length}
          itemSize={index => getItemSize(index, width)}
          itemData={itemData}
          ref={labelRef}
        >
          {VirtualLabelItem}
        </VariableSizeList>
      )}
    </AutoSizer>
  );
};

VirtualLabel.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    albums: PropTypes.arrayOf(PropTypes.shape({}))
  })).isRequired
};

export default VirtualLabel;
