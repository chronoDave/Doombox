import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { TextField } from '@material-ui/core';

// Styles
import { useInputTextStyles } from './InputText.style';

const InputText = props => {
  const {
    id,
    name,
    label,
    disableDescription,
    description,
    ...rest
  } = props;

  const classes = useInputTextStyles();
  const { t } = useTranslation();

  return (
    <TextField
      // General
      variant="outlined"
      margin="normal"
      fullWidth
      FormHelperTextProps={{
        classes: {
          root: classes.helperText
        }
      }}
      // Input
      name={name}
      inputProps={{ id: `${id}-${name}` }}
      // Text
      label={label || t(`field:${name}`)}
      helperText={!disableDescription ?
        (description || t(`description:field_${name}`)) :
        null
      }
      {...rest}
    />
  );
};

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  disableDescription: PropTypes.bool
};

InputText.defaultProps = {
  label: null,
  description: null,
  disableDescription: false
};

export default InputText;
