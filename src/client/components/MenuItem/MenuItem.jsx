import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '../../utils';
import { ButtonBase } from '..';

import './MenuItem.scss';

const MenuItem = props => {
  const {
    primary,
    secondary,
    divider,
    className,
    ...rest
  } = props;

  return (
    <ButtonBase
      className={cx(
        'MenuItem',
        divider && 'divider',
        className
      )}
      disableAnimation
      {...rest}
    >
      <p className="nowrap">{primary}</p>
      {secondary && <p className="secondary">{secondary}</p>}
    </ButtonBase>
  );
};

MenuItem.defaultProps = {
  divider: false,
  secondary: null,
  className: null
};

MenuItem.propTypes = {
  divider: PropTypes.bool,
  primary: PropTypes.string.isRequired,
  className: PropTypes.string,
  secondary: PropTypes.string
};

export default MenuItem;
