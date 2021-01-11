import React from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../Typography';

// Validation
import { propTablePairs } from '../../validation/propTypes';

// Styles
import useTablePairStyles from './TablePair.styles';

const TablePair = ({ values, className, ...rest }) => {
  const classes = useTablePairStyles();

  return (
    <Typography
      element="table"
      className={cx(classes.root, className)}
      {...rest}
    >
      <tbody>
        {values.map(({ key, label, value }) => (
          <tr key={key || label}>
            <td className={classes.label}>
              {label}
            </td>
            <td>
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </Typography>
  );
};

TablePair.defaultProps = {
  className: ''
};

TablePair.propTypes = {
  values: propTablePairs.isRequired,
  className: PropTypes.string
};

export default TablePair;
