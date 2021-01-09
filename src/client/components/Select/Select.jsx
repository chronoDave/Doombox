import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '../ButtonBase';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { Popper } from '../Popper';
import { MenuItem } from '../MenuItem';

// Hooks
import { useTimeoutOpen } from '../../hooks';

// Styles
import useSelectStyles from './Select.styles';

const Select = ({ active, values, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();
  const classes = useSelectStyles();

  return (
    <Fragment>
      <ButtonBase
        onClick={event => {
          setOpen(!open);
          setAnchorEl(event.currentTarget);
        }}
        onMouseEnter={() => open && handleEnter()}
        onMouseLeave={handleLeave}
        className={classes.root}
        disableAnimation
      >
        <Typography color="inherit" className={classes.label}>
          {values[active].primary || values[active]}
        </Typography>
        <Icon type={open ? 'menuUp' : 'menuDown'} className={classes.icon} />
      </ButtonBase>
      <Popper
        anchorEl={anchorEl}
        open={open}
        placement="bottom-start"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          width: anchorEl ?
            anchorEl.getBoundingClientRect().width :
            0
        }}
      >
        {Object.entries(values).map(([key, value]) => (
          <MenuItem
            key={key}
            primary={value.primary || value}
            secondary={value.secondary}
            divider={value.divider}
            onClick={event => {
              setOpen(false);
              onChange(event, value.value || key, values[key]);
            }}
          />
        ))}
      </Popper>
    </Fragment>
  );
};

Select.propTypes = {
  active: PropTypes.string.isRequired,
  values: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired
};

export default Select;
