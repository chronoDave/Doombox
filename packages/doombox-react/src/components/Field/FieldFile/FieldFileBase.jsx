import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// Style
import FieldFileStyle from './FieldFileStyle';

const FieldFileBase = props => {
  const {
    classes,
    id,
    name,
    setFieldValue,
    render,
    validator,
    type,
    ...rest
  } = props;

  const onClick = () => {
    const input = document.getElementById(`${id}-select-${name}`);

    if (input) input.click();
  };

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
            path: event.currentTarget.files[0].path,
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
        {render({ onClick })}
      </label>
    </Box>
  );
};

FieldFileBase.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  validator: PropTypes.array,
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

export default withStyles(
  FieldFileStyle
)(FieldFileBase);
