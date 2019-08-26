import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  TextField,
  MenuItem
} from '@material-ui/core';

// Validation
import { propOptions } from '../../validation/propTypes';

// Style
import { useSelectStyle } from './Select.style';

const Select = props => {
  const {
    options,
    label,
    ...rest
  } = props;
  const classes = useSelectStyle();
  const { t } = useTranslation();

  return (
    <TextField
      label={label}
      SelectProps={{
        classes: {
          selectMenu: classes.selectMenu
        }
      }}
      fullWidth
      margin="normal"
      variant="outlined"
      {...rest}
      select
    >
      {options.map(option => (
        <MenuItem
          key={option.key || option}
          value={option.value || option}
          classes={{ root: classes.menuItemRoot }}
        >
          {option.t ? option.t() : t(option.key || option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

Select.propTypes = {
  options: propOptions.isRequired,
  label: PropTypes.string.isRequired
};

export default Select;
