import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import path from 'path';

// Core
import { withStyles } from '@material-ui/core/styles';

// Style
import FieldFileStyle from './FieldFileStyle';

const FieldFileBase = props => {
  const {
    classes,
    name,
    setValue,
    render,
    validator,
    type
  } = props;

  const onSelect = () => {
    const input = document.getElementById(`select-${name}`);

    if (input) input.click();
  };

  return (
    // Accessibility must be managed by it's children
    <Fragment>
      <input
        id={`select-${name}`}
        type="file"
        accept={validator.map(value => `${type ? `${type}/` : ''}${value}`).join(',')}
        onChange={event => setValue(
          name,
          // Cast File object into regular object
          {
            lastModified: event.currentTarget.files[0].lastModified,
            lastModifiedDate: event.currentTarget.files[0].lastModifiedDate,
            name: event.currentTarget.files[0].name,
            path: path.normalize(event.currentTarget.files[0].path),
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
        {render({ onSelect })}
      </label>
    </Fragment>

  );
};

FieldFileBase.propTypes = {
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
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
