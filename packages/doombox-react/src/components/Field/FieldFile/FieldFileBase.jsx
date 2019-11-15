import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import clsx from 'clsx';

// Util
import { cleanUrl } from '../../../utils';

// Style
import { useFieldFileStyle } from './FieldFile.style';

const FieldFileBase = props => {
  const {
    id: fieldId,
    name,
    render,
    validator,
    fullWidth,
    type
  } = props;
  const classes = useFieldFileStyle();

  const id = `${fieldId}-file-${name}`;

  const onClick = () => {
    const input = document.getElementById(id);
    input.value = null;

    if (input) input.click();
  };

  return (
    <Field
      name={name}
      render={({
        form: {
          setFieldValue,
          setFieldTouched
        }
      }) => (
        <Fragment>
          <input
            id={id}
            type="file"
            accept={validator.map(value => `${type ? `${type}/` : ''}${value}`).join(',')}
            onChange={event => {
              setFieldValue(
                name,
                // Cast File object into regular object
                {
                  lastModified: event.currentTarget.files[0].lastModified,
                  lastModifiedDate: event.currentTarget.files[0].lastModifiedDate,
                  name: event.currentTarget.files[0].name,
                  path: cleanUrl(event.currentTarget.files[0].path),
                  size: event.currentTarget.files[0].size,
                  type: event.currentTarget.files[0].type,
                }
              );
              setFieldTouched(name, true);
            }}
            className={classes.hidden}
            tabIndex="-1"
          />
          <label
            className={clsx(
              classes.label,
              fullWidth && classes.fullWidth
            )}
            htmlFor={`select-${name}`}
            tabIndex="-1"
          >
            {render({ onClick, onClear: () => setFieldValue(name, null) })}
          </label>
        </Fragment>
      )}
    />
  );
};

FieldFileBase.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validator: PropTypes.arrayOf(PropTypes.string),
  render: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf([
    'audio',
    'video',
    'image'
  ])
};

FieldFileBase.defaultProps = {
  fullWidth: false,
  validator: [],
  type: null
};

export default FieldFileBase;
