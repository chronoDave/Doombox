import React, { Fragment } from 'react';
import { FixedSizeList as VirtualList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// Core
import { useTheme } from '@material-ui/core/styles';

import VirtualTableHead from './VirtualTableHead';
import VirtualTableBody from './VirtualTableBody';

// Validation
import {
  propTableColumns,
  propTableData,
  propLibrary
} from '../../validation/propTypes';

const VirtualTable = ({ itemData, rows, columns }) => {
  const theme = useTheme();

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Fragment>
          <VirtualTableHead columns={columns} width={width} />
          <VirtualList
            width={width}
            height={height - theme.component.virtualCell}
            itemCount={rows.length - 1}
            itemSize={theme.component.virtualCell}
            itemData={itemData}
          >
            {VirtualTableBody}
          </VirtualList>
        </Fragment>
      )}
    </AutoSizer>
  );
};

VirtualTable.propTypes = {
  itemData: propTableData.isRequired,
  columns: propTableColumns.isRequired,
  rows: propLibrary.isRequired
};

export default VirtualTable;
