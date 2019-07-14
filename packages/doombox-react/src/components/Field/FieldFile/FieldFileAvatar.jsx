import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

// Icon
import IconAddImage from '@material-ui/icons/AddPhotoAlternate';
import IconPerson from '@material-ui/icons/Person';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  IconButton
} from '@material-ui/core';

import { Avatar } from '../../Avatar';
import FieldFileBase from './FieldFileBase';
import { Button } from '../../Button';

// Style
import FieldFileStyle from './FieldFileStyle';

const FieldFileAvatar = ({ id, classes }) => (
  <Field
    name="avatar"
    render={({
      field: { name, value },
      form: { setFieldValue }
    }) => (
      <FieldFileBase
        id={id}
        name={name}
        setFieldValue={setFieldValue}
        type="image"
        validator={['png', 'jpg', 'jpeg', 'gif']}
        render={({ onClick, onClear }) => (
          <div className={classes.root}>
            <IconButton
              classes={{ root: classes.fieldFileIcon }}
              onClick={onClick}
            >
              <IconAddImage />
            </IconButton>
            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton
                classes={{ root: classes.fieldFileAvatar }}
                onClick={onClick}
              >
                <Avatar
                  path={value ? value.path : null}
                  fallback={<IconPerson fontSize="large" />}
                />
              </IconButton>
              {value && (
                <Button onClick={onClear}>
                  Clear
                </Button>
              )}
            </Box>
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
