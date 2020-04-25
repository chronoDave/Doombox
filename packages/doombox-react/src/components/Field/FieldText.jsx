import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

// Core
import { InputText } from '../Input';

const FieldText = ({ name, ...rest }) => (
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
          <InputText
            // Input
            name={name}
            value={value}
            error={isError}
            onChange={event => {
              setFieldTouched(name, true);
              setFieldValue(name, event.target.value);
            }}
            {...rest}
          />
          {isError && <ErrorMessage name={name} />}
        </Fragment>
      );
    }}
  </Field>
);

FieldText.propTypes = {
  name: PropTypes.string.isRequired
};

export default FieldText;
