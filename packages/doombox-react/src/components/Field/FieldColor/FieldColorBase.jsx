import React, { Fragment } from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

// Style
import { useFieldColorStyles } from './FieldColor.style';

const FieldColorBase = props => {
  const {
    id: fieldId,
    name,
    children
  } = props;
  const classes = useFieldColorStyles();

  const id = `${fieldId}-color-${name}`;

  const onClick = () => {
    const input = document.getElementById(id);
    input.value = null;

    if (input) input.click();
  };

  const validate = value => (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) ?
    'validation:hex' :
    null
  );

  return (
    <Field
      name={name}
      validate={validate}
    >
      {({
        field: { value },
        form: { setFieldValue, setFieldTouched, errors }
      }) => {
        const onChange = ({ currentTarget: { value: newValue } }) => {
          if (newValue.length < 1 || newValue.length > 7) return;
          setFieldTouched(name, true);
          setFieldValue(name, newValue);
        };

        return (
          <Fragment>
            <input
              id={id}
              type="color"
              value={value}
              onChange={onChange}
              className={classes.hidden}
              tabIndex="-1"
            />
            <label
              className={classes.label}
              htmlFor={`color-${name}`}
              tabIndex="-1"
            >
              {children({
                value,
                onClick,
                onChange,
                errors,
                validate
              })}
            </label>
          </Fragment>
        );
      }}
    </Field>
  );
};

FieldColorBase.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default FieldColorBase;
