import React from 'react';
import {
  Formik,
  Form
} from 'formik';

// Core
import {
  Box,
  Button
} from '@material-ui/core';

import { FieldFolder } from '../../components';

// Actions
import { scanFolders } from '../../actions';

const FormCreateLibrary = () => (
  <Formik
    initialValues={{ folders: [] }}
    onSubmit={scanFolders}
  >
    <Form>
      <Box display="flex">
        <FieldFolder name="folders" multi />
        <Button type="submit">
          Create library
        </Button>
      </Box>
    </Form>
  </Formik>
);

export default FormCreateLibrary;
