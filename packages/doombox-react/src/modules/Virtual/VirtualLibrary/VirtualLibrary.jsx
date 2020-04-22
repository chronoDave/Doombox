import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import PropTypes from 'prop-types';

// Core
import VirtualLibraryItem from './VirtualLibraryItem.private';

// Styles
import { useVirtualLibraryStyles } from './VirtualLibrary.style';

const VirtualLibrary = ({ selected, onClick, folders }) => {
  const classes = useVirtualLibraryStyles();

  const itemData = useMemo(() => ({
    selected,
    onClick,
    folders,
    classes
  }), [
    onClick,
    selected,
    folders,
    classes
  ]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList
          // General
          width={width}
          height={height}
          // Items
          itemCount={folders.length}
          itemData={itemData}
          itemSize={56}
        >
          {VirtualLibraryItem}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

VirtualLibrary.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
};

export default VirtualLibrary;
