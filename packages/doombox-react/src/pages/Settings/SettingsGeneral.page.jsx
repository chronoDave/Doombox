import React from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  Switch,
  Typography
} from '../../components';

// Actions
import { updateStorage } from '../../actions';

// Modules
import { FormParser } from '../../modules';

const SettingsGeneral = props => {
  const {
    forceQuit,
    hardwareAcceleration,
    background
  } = props;

  const updateGeneral = payload => updateStorage(
    TYPE.IPC.CONFIG,
    TYPE.CONFIG.GENERAL,
    payload
  );

  return (
    <Box display="flex" flexDirection="column">
      <Switch
        disabled={window.navigator.platform.includes('Win')}
        translate="forceQuit"
        checked={forceQuit}
        onChange={event => updateGeneral({
          forceQuit: event.target.checked
        })}
      />
      <Switch
        translate="hardwareAcceleration"
        checked={hardwareAcceleration}
        onChange={event => updateGeneral({
          hardwareAcceleration: event.target.checked
        })}
      />
      <Switch
        translate="background"
        checked={background}
        onChange={event => updateGeneral({
          background: event.target.checked
        })}
      />
      <Typography variant="h6" paragraph>
        Advanced
      </Typography>
      <FormParser />
    </Box>
  );
};

SettingsGeneral.propTypes = {
  forceQuit: PropTypes.bool.isRequired,
  hardwareAcceleration: PropTypes.bool.isRequired,
  background: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  forceQuit: state.config[TYPE.CONFIG.GENERAL].forceQuit,
  hardwareAcceleration: state.config[TYPE.CONFIG.GENERAL].hardwareAcceleration,
  background: state.config[TYPE.CONFIG.GENERAL].background
});

export default connect(
  mapStateToProps
)(SettingsGeneral);
