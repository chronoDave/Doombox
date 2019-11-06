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

// Validation
import { propSong } from '../../validation/propTypes';

// Style
import { useVirtualTableStyle } from './VirtualTable.style';

const getItemSize = (item, cellHeight) => {
  if (typeof item === 'string') return cellHeight + 8;
  return cellHeight;
};

const groupRows = (rows, group) => {
  if (!group) return Object.values(rows);

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
    rows,
    group
  } = props;
  const classes = useVirtualTableStyle();
  const grouped = groupRows(rows, group);

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
              itemCount={grouped.length}
              itemSize={index => getItemSize(grouped[index], cellHeight)}
            >
              {memo(itemProps => {
                const { style, index } = itemProps;
                const item = grouped[index];

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
      value: PropTypes.string
    })
  ).isRequired,
  group: PropTypes.string,
  rows: PropTypes.arrayOf(propSong).isRequired
};

VirtualTable.defaultProps = {
  cellHeight: 40,
  group: null
};

export default VirtualTable;
