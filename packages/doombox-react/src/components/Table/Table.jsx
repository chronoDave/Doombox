import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Styles
import { useTableStyles } from './Table.styles';

const Table = props => {
  const {
    className,
    header,
    footer,
    children
  } = props;

  const classes = useTableStyles();

  return (
    <table className={clsx(classes.root, className)}>
      {header && (
        <thead>
          {header}
        </thead>
      )}
      <tbody>
        {children}
      </tbody>
      {footer && (
        <tfoot>
          {footer}
        </tfoot>
      )}
    </table>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired
};

Table.defaultProps = {
  className: null,
  header: null,
  footer: null
};

export default Table;
