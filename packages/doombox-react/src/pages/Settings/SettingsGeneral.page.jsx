import React from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import {
  Switch,
  Box
} from '@material-ui/core';

import { SwitchLabel } from '../../components';

import { ContainerSettings } from '../../modules';

// Actions
import {
  updateConfigPalette,
  updateConfigGeneral,
  updateConfigAdvanced
} from '../../actions';

const SettingsGeneral = props => {
  const {
    // Appearance
    darkTheme,
    backgroundOpacity,
    // Library
    slowSearch,
    reverseScroll,
    dense,
    background,
    // Advanced
    forceQuit,
    hardwareAcceleration
  } = props;

  const id = 'settingsGeneral';

  return (
    <Box display="flex" flexDirection="column">
      <ContainerSettings title="appearance">
        <SwitchLabel id={id} name="darkTheme">
          <Switch
            checked={darkTheme}
            onChange={event => updateConfigPalette({
              darkTheme: event.target.checked
            })}
          />
        </SwitchLabel>
        <SwitchLabel id={id} name="background">
          <Switch
            checked={background}
            onChange={event => updateConfigGeneral({
              background: event.target.checked
            })}
          />
        </SwitchLabel>
        <SwitchLabel id={id} name="backgroundOpacity">
          <Switch
            checked={backgroundOpacity}
            onChange={event => updateConfigPalette({
              backgroundOpacity: event.target.checked
            })}
          />
        </SwitchLabel>
        <SwitchLabel id={id} name="dense">
          <Switch
            checked={dense}
            onChange={event => updateConfigGeneral({
              dense: event.target.checked
            })}
          />
        </SwitchLabel>
      </ContainerSettings>

      <ContainerSettings title="library">
        <SwitchLabel id={id} name="slowSearch">
          <Switch
            checked={slowSearch}
            onChange={event => updateConfigGeneral({
              slowSearch: event.target.checked
            })}
          />
        </SwitchLabel>
        <SwitchLabel id={id} name="reverseScroll">
          <Switch
            checked={reverseScroll}
            onChange={event => updateConfigGeneral({
              reverseScroll: event.target.checked
            })}
          />
        </SwitchLabel>
      </ContainerSettings>

      <ContainerSettings title="advanced">
        <SwitchLabel
          id={id}
          name="forceQuit"
          disabled={window.navigator.platform.includes('Win')}
        >
          <Switch
            checked={forceQuit}
            onChange={event => updateConfigGeneral({
              forceQuit: event.target.checked
            })}
          />
        </SwitchLabel>
        <SwitchLabel id={id} name="hardwareAcceleration">
          <Switch
            checked={hardwareAcceleration}
            onChange={event => updateConfigAdvanced({
              hardwareAcceleration: event.target.checked
            })}
          />
        </SwitchLabel>
      </ContainerSettings>
    </Box>
  );
};

SettingsGeneral.propTypes = {
  // Appearance
  darkTheme: PropTypes.bool.isRequired,
  backgroundOpacity: PropTypes.bool.isRequired,
  // Library
  slowSearch: PropTypes.bool.isRequired,
  reverseScroll: PropTypes.bool.isRequired,
  dense: PropTypes.bool.isRequired,
  background: PropTypes.bool.isRequired,
  // Advanced
  forceQuit: PropTypes.bool.isRequired,
  hardwareAcceleration: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  // Appearance
  darkTheme: state.config[TYPE.CONFIG.PALETTE].darkTheme,
  backgroundOpacity: state.config[TYPE.CONFIG.PALETTE].backgroundOpacity,
  // Library
  slowSearch: state.config[TYPE.CONFIG.GENERAL].slowSearch,
  reverseScroll: state.config[TYPE.CONFIG.GENERAL].reverseScroll,
  dense: state.config[TYPE.CONFIG.GENERAL].dense,
  background: state.config[TYPE.CONFIG.GENERAL].background,
  // Advanced
  forceQuit: state.config[TYPE.CONFIG.GENERAL].forceQuit,
  hardwareAcceleration: state.config[TYPE.CONFIG.ADVANCED].hardwareAcceleration
});

export default connect(
  mapStateToProps
)(SettingsGeneral);
