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
    description,
    ...rest
  } = props;

  const classes = useTypographyStyles();
  const { t } = useTranslation();

  return (
    <TextField
      inputProps={{ id: `${id}-${name}` }}
      label={label || t(`field:${name}`)}
      helperText={description || t(`description:field_${name}`)}
      variant="outlined"
      fullWidth
      margin="normal"
      FormHelperTextProps={{
        classes: {
          root: classes.helperText
        }
      }}
      {...rest}
    />
  );
};

TypographyField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
};

TypographyField.defaultProps = {
  label: null,
  description: null
};

export default TypographyField;
