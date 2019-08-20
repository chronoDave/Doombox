import React from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { TextField } from '@material-ui/core';

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
        <TextField
          inputProps={{ id: `${id}-${name}` }}
          label={t(name)}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors[name] && touched[name]}
          helperText={t(errors[name], { input: t(name) })}
          {...rest}
          value={value}
          onChange={event => {
            setFieldValue(name, event.target.value);
            setFieldTouched(name, true);
          }}
        />
      )}
    />
  );
};

FieldText.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default FieldText;
