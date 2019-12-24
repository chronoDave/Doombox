import React from 'react';
import {
  Formik,
  Form,
  ErrorMessage
} from 'formik';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  FieldFileAvatar,
  FieldText
} from '../../components';

// Actions
import { createPlaylist } from '../../actions';

// Validation
import { schemaCreatePlaylist } from '../../validation/schema';

const id = 'create-playlist';

const FormCreatePlaylist = ({ children }) => (
  <Formik
    initialValues={{
      name: '',
      src: null
    }}
    validationSchema={schemaCreatePlaylist}
    onSubmit={({ name, src }) => createPlaylist(name, src)}
  >
    <Form>
      <Box display="flex" flexDirection="column" alignItems="center">
        <FieldFileAvatar id={id} name="src" />
        <FieldText id={id} name="name" />
      </Box>
      <ErrorMessage name="name" />
      {children}
    </Form>
  </Formik>
);

FormCreatePlaylist.propTypes = {
  children: PropTypes.element.isRequired
};

export default FormCreatePlaylist;
