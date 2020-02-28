import React, { Fragment } from 'react';
import {
  Field,
  ErrorMessage
} from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import { TextField } from '@material-ui/core';

const FieldText = props => {
  const {
    id,
    label,
    description,
    disableDescription,
    name,
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <Field name={name}>
      {({
        field: { value },
        form: {
          setFieldValue,
          setFieldTouched,
          touched,
          errors
        }
      }) => {
        const isError = (!!errors[name] && !!touched[name]);

        return (
          <Fragment>
            <TextField
              // General
              variant="outlined"
              margin="normal"
              fullWidth
              // Input
              name={name}
              value={value}
              inputProps={{ id: `${id}-${name}` }}
              error={isError}
              onChange={event => {
                setFieldTouched(name, true);
                setFieldValue(name, event.target.value);
              }}
              // Text
              label={label || t(`field:${name}`)}
              helperText={!disableDescription && (description || t(`description:field_${name}`))}
              // Rest
              {...rest}
            />
            {isError && <ErrorMessage name={name} />}
          </Fragment>
        );
      }}
    </Field>
  );
};

FieldText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  disableDescription: PropTypes.bool
};

FieldText.defaultProps = {
  label: null,
  description: null,
  disableDescription: false
};

export default FieldText;
