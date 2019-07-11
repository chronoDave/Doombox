import React from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  TextField
} from '@material-ui/core';

const FieldText = props => {
  const {
    name,
    id,
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <Field
      name={name}
      render={({
        field: { value },
        form: {
          setFieldValue,
          errors,
          touched,
          handleBlur
        }
      }) => (
        <Box width="100%" {...rest}>
          <TextField
            id={`${id}-${name}`}
            inputProps={{ onBlur: handleBlur }}
            label={t(name)}
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors[name] && touched[`${id}-${name}`]}
            helperText={t(errors[name], { input: t(name) })}
            value={value}
            onChange={event => setFieldValue(name, event.target.value)}
          />
        </Box>
      )}
    />
  );
};

FieldText.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default FieldText;
