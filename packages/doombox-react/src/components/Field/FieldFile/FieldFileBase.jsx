import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

// Util
import { cleanUrl } from '../../../utils';

// Style
import { useFieldFileStyle } from './FieldFile.style';

const FieldFileBase = props => {
  const {
    id,
    name,
    setFieldValue,
    render,
    validator,
    type,
    ...rest
  } = props;
  const classes = useFieldFileStyle();

  const onClick = () => {
    const input = document.getElementById(`${id}-select-${name}`);
    input.value = null;

    if (input) input.click();
  };

  const onClear = () => setFieldValue(name, null);

  return (
    <Box py={1} {...rest}>
      <input
        id={`${id}-select-${name}`}
        type="file"
        accept={validator.map(value => `${type ? `${type}/` : ''}${value}`).join(',')}
        onChange={event => setFieldValue(
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
        )}
        className={classes.hidden}
        tabIndex="-1"
      />
      <label
        className={classes.label}
        htmlFor={`select-${name}`}
        tabIndex="-1"
      >
        {render({ onClick, onClear })}
      </label>
    </Box>
  );
};

FieldFileBase.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  validator: PropTypes.arrayOf(PropTypes.string),
  render: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'audio',
    'video',
    'image'
  ])
};

FieldFileBase.defaultProps = {
  validator: [],
  type: null
};

export default FieldFileBase;
