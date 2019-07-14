import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

// Icon
import IconBackground from '@material-ui/icons/Image';
import IconAddImage from '@material-ui/icons/AddPhotoAlternate';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  IconButton
} from '@material-ui/core';

import FieldSelectBase from './FieldFileBase';

// Style
import FieldFileStyle from './FieldFileStyle';

const FieldFileBackground = ({ id, classes }) => (
  <Field
    name="background"
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
          <Box width="100%" minHeight={90}>
            {value ? (
              <img src={value.path} className={classes.FieldFileBackground} />
            ) : <IconBackground />}
          </Box>
        )}
      />
    )}
  />
);

export default withStyles(
  FieldFileStyle
)(FieldFileBackground);
