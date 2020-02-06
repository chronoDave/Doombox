import React from 'react';
import {
  Formik,
  Form
} from 'formik';
import {
  CONFIG,
  TYPE
} from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { FieldText } from '../../components';

// Actions
import { updateStorage } from '../../actions';

const FormDiscord = ({ discord, children }) => {
  const id = 'discord';

  return (
    <Formik
      initialValues={discord}
      onSubmit={values => updateStorage(
        TYPE.IPC.CONFIG,
        TYPE.CONFIG.DISCORD,
        values
      )}
    >
      <Form>
        <Box display="flex" flexDirection="column">
          <FieldText id={id} name="token" />
          <FieldText id={id} name="imageKey" />
        </Box>
        {children}
      </Form>
    </Formik>
  );
};

FormDiscord.propTypes = {
  children: PropTypes.element.isRequired,
  discord: PropTypes.shape({
    token: PropTypes.string,
    imageKey: PropTypes.string
  })
};

FormDiscord.defaultProps = {
  discord: {}
};

const mapStateToProps = state => ({
  discord: state.config[TYPE.CONFIG.DISCORD]
});

export default connect(
  mapStateToProps
)(FormDiscord);
