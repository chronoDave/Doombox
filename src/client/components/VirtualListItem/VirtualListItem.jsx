import React from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '../ButtonBase';
import { Typography } from '../Typography';

// Validation
import { propVirtualStyle } from '../../validation/propTypes';

// Styles
import useVirtualListItemStyles from './VirtualListItem.styles';

const VirtualListItem = props => {
  const {
    index,
    style,
    active,
    primary,
    secondary,
    className,
    ...rest
  } = props;
  const classes = useVirtualListItemStyles();

  return (
    <ButtonBase
      style={style}
      className={cx(classes.root, {
        [classes.active]: active
      }, className)}
      {...rest}
    >
      {typeof index === 'number' && (
        <Typography
          className={cx(classes.index, { [classes.secondaryActive]: active })}
          color="textSecondary"
        >
          {`${index + 1}.`}
        </Typography>
      )}
      <div className={classes.label}>
        <Typography
          clamp
          className={cx({ [classes.primaryActive]: active })}
          color="textPrimary"
        >
          {primary}
        </Typography>
        {secondary && (
          <Typography
            clamp
            className={cx({ [classes.secondaryActive]: active })}
            color="textSecondary"
          >
            {secondary}
          </Typography>
        )}
      </div>
    </ButtonBase>
  );
};

VirtualListItem.defaultProps = {
  className: null,
  index: null,
  active: false,
  secondary: null
};

VirtualListItem.propTypes = {
  index: PropTypes.number,
  className: PropTypes.string,
  style: propVirtualStyle.isRequired,
  active: PropTypes.bool,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
};

export default VirtualListItem;
