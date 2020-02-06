import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import { IconButton } from '@material-ui/core';

import { Tooltip } from '../Tooltip';

// Styles
import { useIconButtonStyles } from './IconButton.style';

const IconButtonNavigation = props => {
  const {
    tooltip,
    active,
    className,
    icon,
    ...rest
  } = props;
  const classes = useIconButtonStyles();

  return (
    <Tooltip
      title={tooltip}
      placement="right"
      arrow
    >
      <IconButton
        classes={{ root: classes.root }}
        className={clsx(
          { [classes.active]: active },
          className
        )}
        {...rest}
      >
        {active && <div className={classes.activeBar} />}
        {cloneElement(icon, { fontSize: 'inherit' })}
      </IconButton>
    </Tooltip>
  );
};

IconButtonNavigation.displayName = 'IconButtonNavigation';
IconButtonNavigation.propTypes = {
  tooltip: PropTypes.string.isRequired,
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
