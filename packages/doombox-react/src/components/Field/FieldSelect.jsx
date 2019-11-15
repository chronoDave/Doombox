import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

// Core
import { Select } from '../Select';

const FieldSelect = props => {
  const {
    id,
    name,
    label,
    effect,
    ...rest
  } = props;

  return (
    <Field
      name={name}
      render={({
        field: { value },
        form: { setFieldValue, setFieldTouched }
      }) => (
        <Select
          label={label || name}
          inputProps={{ id: `${id}-${name}` }}
          onChange={event => {
            setFieldValue(name, event.target.value);
            setFieldTouched(name, true);
            if (effect) effect(event);
          }}
          value={value}
          {...rest}
        />
      )}
    />
  );
};

FieldSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  effect: PropTypes.func
};

FieldSelect.defaultProps = {
  label: null,
  effect: null
};

export default FieldSelect;
