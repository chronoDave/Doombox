import React from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Styles
import useTableStyles from './Table.styles';

const Table = ({ children, className }) => {
  const classes = useTableStyles();

  return (
    <table className={cx(classes.root, className)}>
      <tbody>
        {children}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  className: ''
};

Table.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Table;
