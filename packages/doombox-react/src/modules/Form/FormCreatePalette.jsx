import React from 'react';
import {
  Formik,
  Form
} from 'formik';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';

// Core
import { Button } from '@material-ui/core';

import { FieldPalette } from '../../components';

// Actions
import { updateStorage } from '../../actions';

// Utils
import { propPalette } from '../../utils/propTypes';

const FormCreatePalette = ({ palette }) => {
  const formId = 'create-palette';

  return (
    <Formik
      initialValues={palette}
      onSubmit={values => updateStorage(
        TYPE.IPC.CONFIG,
        TYPE.CONFIG.PALETTE,
        values
      )}
    >
      <Form>
        <Button type="submit">
          Update
        </Button>
        {[
          'primary',
          'secondary',
          'error',
          'warning',
          'success',
          'info'
        ].map(key => (
          <FieldPalette
            key={key}
            id={formId}
            name={key}
          />
        ))}
      </Form>
    </Formik>
  );
};

FormCreatePalette.propTypes = {
  palette: propPalette
};

FormCreatePalette.defaultProps = {
  palette: {}
};

const mapStateToProps = state => ({
  palette: state.palette[TYPE.CONFIG.PALETTE]
});

export default connect(
  mapStateToProps
)(FormCreatePalette);
