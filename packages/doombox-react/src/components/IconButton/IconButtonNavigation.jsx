import React, {
  cloneElement,
  forwardRef
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import {
  IconButton
} from '@material-ui/core';

// Styles
import { useIconButtonStyles } from './IconButton.style';

const IconButtonNavigation = forwardRef((props, ref) => {
  const {
    active,
    className,
    icon,
    ...rest
  } = props;
  const classes = useIconButtonStyles();

  return (
    <IconButton
      classes={{ root: classes.root }}
      className={clsx(
        { [classes.active]: active },
        className
      )}
      {...rest}
      ref={ref}
    >
      {active && <div className={classes.activeBar} />}
      {cloneElement(icon, { fontSize: 'inherit' })}
    </IconButton>
  );
});

IconButtonNavigation.displayName = 'IconButtonNavigation';
IconButtonNavigation.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

IconButtonNavigation.defaultProps = {
  className: null,
  active: false
};

export default IconButtonNavigation;
