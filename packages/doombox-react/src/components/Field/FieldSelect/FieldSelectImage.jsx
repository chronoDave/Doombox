import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

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
    <Fragment>
      <input
        id={`select-${field.name}`}
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        onChange={event => setValue(
          field.name,
          event.currentTarget.files[0]
        )}
        className={classes.hidden}
      />
      <label
        className={classes.label}
        htmlFor={`select-${field.name}`}
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
