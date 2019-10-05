import React, { memo } from 'react';
import {
  VariableSizeList as VirtualList,
  areEqual
} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import VirtualTableHead from './VirtualTableHead';
import VirtualTableRow from './VirtualTableRow';
import VirtualTableDivider from './VirtualTableDivider';

// Style
import { useVirtualTableStyle } from './VirtualTable.style';

const normalizeRows = rows => {
  if (Array.isArray(rows)) return rows;

  return Object.keys(rows).map(key => {
    const values = rows[key];

    return [`${values[0].TPE2} / ${values[0].TALB}`, ...values];
  }).flat();
};

const getItemSize = (item, cellHeight) => {
  if (typeof item === 'string') return cellHeight + 8;
  return cellHeight;
};

const VirtualTable = props => {
  const {
    cellHeight,
    columns,
    rows
  } = props;
  const classes = useVirtualTableStyle();
  const normalizedRows = normalizeRows(rows);

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
              itemCount={normalizedRows.length - 1}
              itemSize={index => getItemSize(normalizedRows[index], cellHeight)}
            >
              {memo(itemProps => {
                const { style, index } = itemProps;
                const item = normalizedRows[index];

                return (
                  <div style={style}>
                    {typeof item === 'string' ? (
                      <VirtualTableDivider value={item} />
                    ) : (
                      <VirtualTableRow
                        columns={columns.map(({ value }) => value)}
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
