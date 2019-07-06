import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';

// Style
import FieldSelectStyle from './FieldSelectStyle';

const FieldSelectImage = props => {
  const {
    classes,
    inputProps,
    setValue,
    children
  } = props;

  return (
    <Fragment>
      <input
        {...inputProps}
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        onChange={event => setValue(
          inputProps.name,
          event.currentTarget.files[0]
        )}
        className={classes.hidden}
      />
      <label
        className={classes.label}
        htmlFor={inputProps.id}
      >
        {children}
      </label>
    </Fragment>

  );
};

FieldSelectImage.propTypes = {
  inputProps: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  setValue: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(
  FieldSelectStyle
)(FieldSelectImage);
