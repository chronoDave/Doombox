import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TypographyField } from '../Typography';

const FieldText = ({ name, ...rest }) => {
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
        const isError = !!errors[name] && touched[name];

        return (
          <TypographyField
            name={name}
            value={value}
            error={isError}
            description={isError && t(errors[name], { input: t(name) })}
            onChange={event => {
              setFieldValue(name, event.target.value);
              setFieldTouched(name, true);
            }}
            {...rest}
          />
        );
      }}
    </Field>
  );
};

FieldText.propTypes = {
  name: PropTypes.string.isRequired
};

export default FieldText;
