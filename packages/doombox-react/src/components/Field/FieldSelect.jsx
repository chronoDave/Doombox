import React from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  MenuItem,
  TextField
} from '@material-ui/core';

// Styles
import { useFieldStyle } from './Field.style';

const FieldSelect = props => {
  const {
    id,
    name,
    options,
    label,
    effect,
    ...rest
  } = props;
  const classes = useFieldStyle();
  const { t } = useTranslation();

  return (
    <Field
      name={name}
      render={({
        field: { value },
        form: { setFieldValue, setFieldTouched }
      }) => (
        <TextField
          label={t(label || name)}
          inputProps={{ id: `${id}-${name}` }}
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
          value={value}
          onChange={event => {
            setFieldValue(name, event.target.value);
            setFieldTouched(name, true);
            if (effect) effect(event);
          }}
        >
          {options.map(option => (
            <MenuItem
              key={option.key || option}
              value={option.value || value}
              classes={{ root: classes.menuItemRoot }}
            >
              {option.t() || t(option.key || option)}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

FieldSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  effect: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ]).isRequired,
      t: PropTypes.func
    }))
  ]).isRequired
};

FieldSelect.defaultProps = {
  label: null,
  effect: null
};

export default FieldSelect;
