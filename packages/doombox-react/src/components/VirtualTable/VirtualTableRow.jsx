import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

// Style
import { useVirtualTableStyle } from './VirtualTable.style';

// Validation
import { propTableColumns } from '../../validation/propTypes';

const VirtualTableRow = props => {
  const {
    columns,
    width,
    children,
    ...rest
  } = props;
  const classes = useVirtualTableStyle({ width, count: columns.length - 1 });

  return (
    <div
      className={classes.row}
      {...rest}
    >
      {columns.map((column, index) => cloneElement(
        children({ column, index }),
        { className: classes.cell }
      ))}
    </div>
  );
};

VirtualTableRow.propTypes = {
  children: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  columns: propTableColumns.isRequired
};

VirtualTableRow.defaultProps = {
  width: '100%'
};

export default VirtualTableRow;
