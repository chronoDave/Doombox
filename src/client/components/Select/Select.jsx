import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '../ButtonBase';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { Menu } from '../Menu';

// Hooks
import { useHover } from '../../hooks';

// Styles
import useSelectStyles from './Select.styles';

const Select = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useSelectStyles();
  const { onEnter, onLeave } = useHover({
    enter: () => setOpen(true),
    leave: () => setOpen(false)
  });

  return (
    <Fragment>
      <ButtonBase
        onClick={event => {
          setAnchorEl(event.currentTarget);
          setOpen(!open);
        }}
        onMouseEnter={() => open && onEnter()}
        onMouseLeave={onLeave}
        className={classes.root}
        disableAnimation
      >
        <Typography color="inherit" className={classes.label}>
          {label}
        </Typography>
        <Icon type={open ? 'menuUp' : 'menuDown'} className={classes.icon} />
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setOpen(false);
          setAnchorEl(null);
        }}
        placement="bottom-start"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {children}
      </Menu>
    </Fragment>
  );
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

export default Select;
