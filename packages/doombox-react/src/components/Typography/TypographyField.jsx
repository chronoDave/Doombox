import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { TextField } from '@material-ui/core';

// Styles
import { useTypographyStyles } from './Typography.style';

const TypographyField = props => {
  const {
    id,
    name,
    label,
    disableDescription,
    description,
    ...rest
  } = props;

  const classes = useTypographyStyles();
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

TypographyField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  disableDescription: PropTypes.bool
};

TypographyField.defaultProps = {
  label: null,
  description: null,
  disableDescription: false
};

export default TypographyField;
