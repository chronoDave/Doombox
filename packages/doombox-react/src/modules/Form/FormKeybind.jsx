import React from 'react';
import {
  Formik,
  Form
} from 'formik';
import {
  TYPE,
  ACTION
} from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  Typography,
  FieldText
} from '../../components';

// Actions
import { updateConfigKeybind } from '../../actions';

const FormKeybind = ({ keybind, children }) => (
  <Formik
    initialValues={keybind}
    onSubmit={updateConfigKeybind}
  >
    <Form>
      <Box display="flex" flexDirection="column">
        <Typography>
          Audio
        </Typography>
        {Object.keys(ACTION.AUDIO).map(key => (
          <FieldText key={key} id={key} name={key} />
        ))}
      </Box>
      {children}
    </Form>
  </Formik>
);

FormKeybind.propTypes = {
  children: PropTypes.element.isRequired,
  keybind: PropTypes.shape({
    [ACTION.AUDIO.NEXT]: PropTypes.string,
    [ACTION.AUDIO.PREVIOUS]: PropTypes.string,
    [ACTION.AUDIO.PLAY]: PropTypes.string,
    [ACTION.AUDIO.PAUSE]: PropTypes.string,
    [ACTION.AUDIO.STOP]: PropTypes.string,
    [ACTION.AUDIO.VOLUME_UP]: PropTypes.string,
    [ACTION.AUDIO.VOLUME_DOWN]: PropTypes.string,
    [ACTION.AUDIO.MUTE]: PropTypes.string,
  })
};

FormKeybind.defaultProps = {
  keybind: {}
};

const mapStateToProps = state => ({
  keybind: state.config[TYPE.CONFIG.KEYBIND]
});

export default connect(
  mapStateToProps
)(FormKeybind);
