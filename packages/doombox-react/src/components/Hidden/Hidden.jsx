import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Styles
import { useHiddenStyles } from './Hidden.styles';

const Hidden = props => {
  const {
    smallDown,
    smallUp,
    mediumDown,
    mediumUp,
    largeDown,
    largeUp,
    className,
    children
  } = props;
  const classes = useHiddenStyles();

  return (
    <div
      className={clsx({
        [classes.smallDown]: smallDown,
        [classes.smallUp]: smallUp,
        [classes.mediumDown]: mediumDown,
        [classes.mediumUp]: mediumUp,
        [classes.largeDown]: largeDown,
        [classes.largeUp]: largeUp
      }, className)}
    >
      {children}
    </div>
  );
};

Hidden.defaultProps = {
  className: null,
  smallDown: false,
  smallUp: false,
  mediumDown: false,
  mediumUp: false,
  largeDown: false,
  largeUp: false
};

Hidden.propTypes = {
  className: PropTypes.string,
  smallDown: PropTypes.bool,
  smallUp: PropTypes.bool,
  mediumDown: PropTypes.bool,
  mediumUp: PropTypes.bool,
  largeDown: PropTypes.bool,
  largeUp: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Hidden;
