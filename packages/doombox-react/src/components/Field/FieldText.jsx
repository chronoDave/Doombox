import React from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  TextField
} from '@material-ui/core';

const FieldText = ({ name, id, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Field
      name={name}
      render={({
        field: { value },
        form: {
          setFieldValue,
          setFieldTouched,
          touched,
          errors
        }
      }) => (
        <Box width="100%" {...rest}>
          <TextField
            inputProps={{ id: `${id}-${name}` }}
            label={t(name)}
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors[name] && touched[name]}
            helperText={t(errors[name], { input: t(name) })}
            value={value}
            onChange={event => {
              setFieldValue(name, event.target.value);
              setFieldTouched(name, true);
            }}
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
