import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '../../utils';
import { propTablePairs } from '../../validation/propTypes';

import './TablePair.scss';

const TablePair = ({ values, className, ...rest }) => (
  <table
    className={cx('TablePair', className)}
    {...rest}
  >
    <tbody>
      {values.map(({ key, label, value }) => (
        <tr key={key || label}>
          <td className="subtitle label">{label}</td>
          <td className="subtitle">{value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TablePair.defaultProps = {
  className: ''
};

TablePair.propTypes = {
  values: propTablePairs.isRequired,
  className: PropTypes.string
};

export default TablePair;
