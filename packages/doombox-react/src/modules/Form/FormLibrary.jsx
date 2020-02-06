import React from 'react';
import { TYPE } from '@doombox/utils';
import {
  Formik,
  Form
} from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  FieldFolder,
  Button
} from '../../components';

// Actions
import {
  updateStorage,
  scanFolders
} from '../../actions';

const FormLibrary = ({ library }) => (
  <Formik
    initialValues={library}
    onSubmit={values => updateStorage(
      TYPE.IPC.CONFIG,
      TYPE.CONFIG.LIBRARY,
      values
    )}
  >
    <Form>
      <Box display="flex" flexDirection="column">
        <FieldFolder name="folders" multi />
        <Box display="flex">
          <Button type="submit">
            Save folders
          </Button>
          <Button onClick={() => scanFolders(library.folders)}>
            Create library
          </Button>
        </Box>
      </Box>
    </Form>
  </Formik>
);

FormLibrary.propTypes = {
  library: PropTypes.shape({
    folders: PropTypes.arrayOf(PropTypes.string)
  })
};

FormLibrary.defaultProps = {
  library: []
};

const mapStateToProps = state => ({
  library: state.config[TYPE.CONFIG.LIBRARY]
});

export default connect(
  mapStateToProps
)(FormLibrary);
