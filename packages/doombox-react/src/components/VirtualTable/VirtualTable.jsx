import React, { memo } from 'react';
import {
  VariableSizeList as VirtualList,
  areEqual
} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import PropTypes from 'prop-types';
import groupby from 'lodash.groupby';

// Core
import { Box } from '@material-ui/core';

import VirtualTableHead from './VirtualTableHead';
import VirtualTableRow from './VirtualTableRow';
import VirtualTableDivider from './VirtualTableDivider';

// Style
import { useVirtualTableStyle } from './VirtualTable.style';

const getItemSize = (item, cellHeight) => {
  if (typeof item === 'string') return cellHeight + 8;
  return cellHeight;
};

const groupRows = (rows, group) => {
  const groupedRows = groupby(rows, group);
  return Object.keys(groupedRows)
    .map(key => {
      const value = groupedRows[key];
      return [key, ...value];
    })
    .flat();
};

const VirtualTable = props => {
  const {
    cellHeight,
    columns,
    rows
  } = props;
  const classes = useVirtualTableStyle();
  const groupedRows = groupRows(rows, 'album');

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <VirtualTableHead columns={columns} />
      <Box flexGrow={1}>
        <AutoSizer>
          {({ width, height }) => (
            <VirtualList
              // List properties
              width={width}
              height={height}
              className={classes.root}
              // Item properties
              itemCount={rows.length - 1}
              itemSize={index => getItemSize(rows[index], cellHeight)}
            >
              {memo(itemProps => {
                const { style, index } = itemProps;
                const item = groupedRows[index];

                return (
                  <div style={style}>
                    {typeof item === 'string' ? (
                      <VirtualTableDivider value={item} />
                    ) : (
                      <VirtualTableRow
                        columns={columns.map(column => column.value || column.key)}
                        row={item}
                      />
                    )}
                  </div>
                );
              }, areEqual)}
            </VirtualList>
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};

VirtualTable.propTypes = {
  cellHeight: PropTypes.number,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  rows: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
      })
    )
  ]).isRequired
};

VirtualTable.defaultProps = {
  cellHeight: 40
};

export default VirtualTable;
