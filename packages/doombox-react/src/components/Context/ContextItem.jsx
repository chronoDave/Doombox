import React, { forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '@material-ui/core';

import { Typography } from '../Typography';

// Styles
import { useContextStyles } from './Context.style';

const ContextItem = forwardRef((props, ref) => {
  const {
    disableAutoClose,
    onClick,
    onClose,
    primary,
    ...rest
  } = props;

  const classes = useContextStyles();

  const handleClick = event => {
    onClick(event);
    if (!disableAutoClose && onClose) onClose();
  };

  return (
    <ButtonBase
      onClick={handleClick}
      className={clsx(
        classes.itemRoot,
        classes.itemButton
      )}
      ref={ref}
    >
      <Typography variant="body2" {...rest}>
        {primary}
      </Typography>
    </ButtonBase>
  );
});

ContextItem.propTypes = {
  disableAutoClose: PropTypes.bool,
  primary: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func
};

ContextItem.defaultProps = {
  disableAutoClose: false,
  onClose: null
};

export default ContextItem;
