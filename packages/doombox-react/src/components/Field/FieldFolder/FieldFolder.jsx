import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

// Core
import FieldFolderBase from './FieldFolderBase';

const FieldFolder = ({ name, ...rest }) => (
  <Field name={name}>
    {({
      field: { value },
      form: {
        setFieldValue,
        setFieldTouched
      }
    }) => (
      <FieldFolderBase
        value={value}
        onChange={folders => {
          setFieldTouched(name, true);
          setFieldValue(name, folders);
        }}
        {...rest}
      />
    )}
  </Field>
);

FieldFolder.propTypes = {
  name: PropTypes.string.isRequired
};

export default FieldFolder;
