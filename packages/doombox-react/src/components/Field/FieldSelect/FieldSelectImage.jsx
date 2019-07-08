import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import path from 'path';

// Core
import { withStyles } from '@material-ui/core/styles';

// Style
import FieldSelectStyle from './FieldSelectStyle';

const FieldSelectImage = props => {
  const {
    classes,
    field,
    setValue,
    render
  } = props;

  const onSelect = () => {
    const input = document.getElementById(`select-${field.name}`);

    if (input) input.click();
  };

  return (
    // Accessibility must be managed by it's children
    <Fragment>
      <input
        id={`select-${field.name}`}
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        onChange={event => setValue(
          field.name,
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
        htmlFor={`select-${field.name}`}
        tabIndex="-1"
      >
        {render({ onSelect })}
      </label>
    </Fragment>

  );
};

FieldSelectImage.propTypes = {
  field: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired
};

export default withStyles(
  FieldSelectStyle
)(FieldSelectImage);
