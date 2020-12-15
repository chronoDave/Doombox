import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../Typography';

// Styles
import useTablePairStyles from './TablePair.styles';

const TablePair = ({ label, value, ...rest }) => {
  const classes = useTablePairStyles();

  return (
    <tr>
      <td className={classes.label}>
        <Typography {...rest}>
          {label}
        </Typography>
      </td>
      <td>
        <Typography {...rest}>
          {value}
        </Typography>
      </td>
    </tr>
  );
};

TablePair.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default TablePair;
