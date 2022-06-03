import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '../../utils';
import { ButtonBase } from '..';
import { propVirtualStyle } from '../../validation/propTypes';

import './VirtualListItem.scss';

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

  return (
    <ButtonBase
      style={style}
      className={cx(
        'VirtualListItem',
        active && 'active',
        className
      )}
      {...rest}
    >
      {typeof index === 'number' && <p className="index">{`${index + 1}.`}</p>}
      <div className="label">
        <p className="primary">{primary}</p>
        {secondary && <p className="secondary">{secondary}</p>}
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
  secondary: PropTypes.string
};

export default VirtualListItem;
