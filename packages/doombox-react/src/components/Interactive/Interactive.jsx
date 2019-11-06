import React, {
  Fragment,
  useState,
  cloneElement,
  useRef,
  forwardRef
} from 'react';
import PropTypes from 'prop-types';

// Core
import { Popper } from '@material-ui/core';

// Validation
import { propPlacement } from '../../validation/propTypes';

// Style
import { useInteractiveStyle } from './Interactive.style';

const Interactive = forwardRef((props, ref) => {
  const {
    placement,
    delay,
    popper,
    children,
    ...rest
  } = props;

  const classes = useInteractiveStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const timer = useRef();

  const handleLeave = () => {
    timer.current = setTimeout(() => {
      setAnchorEl(null);
    }, delay);
  };

  const childrenProps = {
    onMouseOver: event => {
      clearTimeout(timer.current);
      setAnchorEl(event.currentTarget);
    },
    onMouseLeave: handleLeave
  };

  const interactiveProps = {
    onMouseOver: () => clearTimeout(timer.current),
    onMouseLeave: handleLeave
  };

  return (
    <Fragment>
      {cloneElement(children, { ...childrenProps, ref })}
      <Popper
        placement={placement}
        open={!!anchorEl}
        anchorEl={anchorEl}
        className={classes.root}
        {...interactiveProps}
        {...rest}
      >
        {popper}
      </Popper>
    </Fragment>
  );
});

Interactive.propTypes = {
  children: PropTypes.element.isRequired,
  popper: PropTypes.element.isRequired,
  delay: PropTypes.number,
  placement: propPlacement
};

Interactive.defaultProps = {
  delay: 60,
  placement: 'right'
};

export default Interactive;
