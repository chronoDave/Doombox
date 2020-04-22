import React, { Fragment } from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Switch,
  Box
} from '@material-ui/core';

import {
  Typography,
  SwitchLabel
} from '../../components';

// Actions
import {
  updateConfigGeneral,
  updateConfigAdvanced
} from '../../actions';

const SettingsGeneral = props => {
  const {
    // Library
    localized,
    slowSearch,
    reverseScroll,
    // Advanced
    forceQuit,
    hardwareAcceleration
  } = props;
  const id = 'settingsGeneral';

  const { t } = useTranslation();

  return (
    <Fragment>
      <Typography variant="h6">
        {t('library')}
      </Typography>
      <Box p={1}>
        <SwitchLabel id={id} name="localized">
          <Switch
            checked={localized}
            onChange={event => updateConfigGeneral({
              localized: event.target.checked
            })}
          />
        </SwitchLabel>
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
      </Box>
      <Typography variant="h6">
        {t('advanced')}
      </Typography>
      <Box p={1}>
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
      </Box>
    </Fragment>
  );
};

SettingsGeneral.propTypes = {
  // Library
  localized: PropTypes.bool.isRequired,
  slowSearch: PropTypes.bool.isRequired,
  reverseScroll: PropTypes.bool.isRequired,
  // Advanced
  forceQuit: PropTypes.bool.isRequired,
  hardwareAcceleration: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  // Library
  slowSearch: state.config[TYPE.CONFIG.GENERAL].slowSearch,
  localized: state.config[TYPE.CONFIG.GENERAL].localized,
  reverseScroll: state.config[TYPE.CONFIG.GENERAL].reverseScroll,
  // Advanced
  forceQuit: state.config[TYPE.CONFIG.GENERAL].forceQuit,
  hardwareAcceleration: state.config[TYPE.CONFIG.ADVANCED].hardwareAcceleration
});

export default connect(
  mapStateToProps
)(SettingsGeneral);
