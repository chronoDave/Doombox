import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Styles
import { useHiddenStyles } from './Hidden.styles';

const Hidden = props => {
  const { smallDown, children } = props;
  const classes = useHiddenStyles();

  return (
    <div
      className={clsx({
        [classes.smallDown]: smallDown
      })}
    >
      {children}
    </div>
  );
};

Hidden.defaultProps = {
  smallDown: false
};

Hidden.propTypes = {
  smallDown: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Hidden;
