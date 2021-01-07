import React, {
  Fragment,
  Children,
  cloneElement,
  useRef
} from 'react';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '../ButtonBase';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { Popper } from '../Popper';

// Hooks
import { useTimeoutOpen } from '../../hooks';

// Styles
import useSelectStyles from './Select.styles';

const Select = ({ label, children }) => {
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();
  const classes = useSelectStyles();

  const ref = useRef();

  return (
    <Fragment>
      <ButtonBase
        onClick={() => setOpen(!open)}
        onMouseEnter={() => open && handleEnter()}
        onMouseLeave={handleLeave}
        className={classes.root}
        ref={ref}
        disableAnimation
      >
        <Typography color="inherit" className={classes.label}>
          {label}
        </Typography>
        <Icon type={open ? 'menuUp' : 'menuDown'} className={classes.icon} />
      </ButtonBase>
      <Popper
        anchorEl={ref.current}
        open={open}
        placement="bottom-start"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {Children.map(children, child => cloneElement(child, {
          onClick: event => {
            setOpen(false);
            child.props.onClick(event);
          }
        }))}
      </Popper>
    </Fragment>
  );
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

export default Select;
