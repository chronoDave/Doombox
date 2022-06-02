import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// Core
import {
  ButtonBase,
  Icon,
  Popper,
  MenuItem
} from '..';

// Hooks
import { useTimeoutOpen } from '../../hooks';

import './Select.scss';

const Select = ({ active, values, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();

  return (
    <Fragment>
      <ButtonBase
        onClick={event => {
          setOpen(!open);
          setAnchorEl(event.currentTarget);
        }}
        onMouseEnter={() => open && handleEnter()}
        onMouseLeave={handleLeave}
        className="Select button"
        disableAnimation
      >
        <p className="label">{values[active].primary || values[active]}</p>
        <Icon type={open ? 'menuUp' : 'menuDown'} />
      </ButtonBase>
      <Popper
        anchorEl={anchorEl}
        open={open}
        placement="bottom-start"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="Select menu"
        style={{
          width: anchorEl ?
            anchorEl.getBoundingClientRect().width :
            0
        }}
      >
        <div className="body">
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
        </div>
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
