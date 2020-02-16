import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect
} from 'react';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { useTheme } from '@material-ui/core/styles';

import LabelItem from './LabelItem.private';

// Redux
import {
  setPlaylist as dispatchSetPlaylist,
  addPlaylist as dispatchAddPlaylist
} from '../../redux';

// Utils
import { propLabel } from '../../utils/propTypes';

// Styles
import { useLabelStyles } from './Label.style';

const VirtualLabel = props => {
  const {
    labels,
    setPlaylist,
    addPlaylist
  } = props;
  const ref = useRef();

  const theme = useTheme();
  const classes = useLabelStyles();
  const { t } = useTranslation();

  const handleResize = debounce(() => ref.current.resetAfterIndex(0), 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.resetAfterIndex(0);
    }
  }, [ref, labels]);

  const dimensions = {
    width: theme.dimensions.label.item * 2 + theme.spacing(2),
    height: theme.dimensions.label.item + theme.spacing(2),
    header: theme.dimensions.label.header + theme.spacing(),
    padding: 2
  };

  const handlePlaylistPlay = useCallback(playlist => {
    setPlaylist(playlist);
  }, [setPlaylist]);

  const handlePlaylistAdd = useCallback(collection => {
    addPlaylist(collection);
  }, [addPlaylist]);

  const itemData = useMemo(() => ({
    labels,
    dimensions,
    handlePlaylistPlay,
    handlePlaylistAdd,
    hooks: {
      classes,
      t
    }
  }), [
    labels,
    dimensions,
    classes,
    handlePlaylistPlay,
    handlePlaylistAdd,
    t
  ]);

  const getItemSize = (index, width) => {
    const label = labels[index];
    const labelSize = label.albums.length;

    const containerWidth =
      width -
      theme.dimensions.scrollbar -
      theme.spacing(dimensions.padding * 2);
    // Calculate how many albums can fit in a single row, should always be bigger than 0
    const rowCount = Math.floor(containerWidth / dimensions.width) || 1;
    // Calculate the row offset between the total row width and the screen width
    const offset = containerWidth - (dimensions.width * rowCount);
    // Total offset is equal to the row offset multiplied by the amount of expected columns
    const totalOffset = Math.floor(labelSize / rowCount) * offset;
    const totalWidth = labelSize * dimensions.width + totalOffset;

    const columns = Math.ceil(totalWidth / containerWidth);

    return (columns * dimensions.height) + dimensions.header;
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <VariableSizeList
          // General
          width={width}
          height={height}
          ref={ref}
          // Item
          itemCount={labels.length}
          itemSize={index => getItemSize(index, width)}
          itemData={itemData}
        >
          {LabelItem}
        </VariableSizeList>
      )}
    </AutoSizer>
  );
};

VirtualLabel.propTypes = {
  labels: PropTypes.arrayOf(propLabel).isRequired,
  setPlaylist: PropTypes.func.isRequired,
  addPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  labels: state.label.collection
});

const mapDispatchToProps = {
  setPlaylist: dispatchSetPlaylist,
  addPlaylist: dispatchAddPlaylist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualLabel);
