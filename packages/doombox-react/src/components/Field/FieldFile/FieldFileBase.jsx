import React, { Fragment } from 'react';
import { Field } from 'formik';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Style
import { useFieldFileStyles } from './FieldFile.style';

const FieldFileBase = props => {
  const {
    name,
    id: fieldId,
    validator,
    type,
    multiple,
    fullWidth,
    children
  } = props;
  const classes = useFieldFileStyles();

  const id = `${fieldId}-file-${name}`;

  const onClick = () => {
    const input = document.getElementById(id);
    input.value = null;

    if (input) input.click();
  };

  const transformFileToObject = file => ({
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate.toString(),
    name: file.name,
    path: file.path,
    size: file.size,
    type: file.type,
  });

  return (
    <Field name={name}>
      {({
        field: { value: fieldValue },
        form: { setFieldValue, setFieldTouched }
      }) => (
        <Fragment>
          <input
            id={id}
            type="file"
            accept={validator.map(value => `${type ? `${type}/` : ''}${value}`).join(',')}
            multiple={multiple}
            onChange={event => {
              const files = Array
                .from(event.currentTarget.files)
                .map(file => transformFileToObject(file));
              setFieldValue(name, multiple ? files : files[0]);
              setFieldTouched(name, true);
            }}
            className={classes.hidden}
            tabIndex="-1"
          />
          <label
            className={clsx(classes.label, { [classes.fullWidth]: fullWidth })}
            htmlFor={`select-${name}`}
            tabIndex="-1"
          >
            {children({
              value: fieldValue,
              onClick,
              onClear: () => setFieldValue(name, '')
            })}
          </label>
        </Fragment>
      )}
    </Field>
  );
};

FieldFileBase.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  validator: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf([
    'audio',
    'video',
    'image'
  ]),
  multiple: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.func.isRequired
};

FieldFileBase.defaultProps = {
  type: null,
  validator: [],
  multiple: false,
  fullWidth: false
};

export default FieldFileBase;
