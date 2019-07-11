import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

// Icon
import IconAddImage from '@material-ui/icons/AddPhotoAlternate';
import IconPerson from '@material-ui/icons/Person';

// Core
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

import { Avatar } from '../../Avatar';
import FieldSelectBase from './FieldFileBase';

// Style
import FieldFileStyle from './FieldFileStyle';

const FieldFileAvatar = ({ id, classes }) => (
  <Field
    name="avatar"
    render={({
      field: { name, value },
      form: { setFieldValue }
    }) => (
      <FieldSelectBase
        id={id}
        name={name}
        setFieldValue={setFieldValue}
        type="image"
        validator={['png', 'jpg', 'jpeg', 'gif']}
        render={({ onClick }) => (
          <div className={classes.root}>
            <IconButton
              classes={{ root: classes.fieldFileIcon }}
              onClick={onClick}
            >
              <IconAddImage />
            </IconButton>
            <IconButton
              classes={{ root: classes.fieldFileAvatar }}
              onClick={onClick}
            >
              <Avatar
                path={value ? value.path : null}
                fallback={<IconPerson fontSize="large" />}
              />
            </IconButton>
          </div>
        )}
      />
    )}
  />
);

FieldFileAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(
  FieldFileStyle
)(FieldFileAvatar);
