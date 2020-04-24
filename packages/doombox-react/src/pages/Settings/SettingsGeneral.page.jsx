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
    // Advanced
    forceQuit,
    hardwareAcceleration
  } = props;
  const id = 'settingsGeneral';

  const { t } = useTranslation();

  return (
    <Fragment>
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
  // Advanced
  forceQuit: PropTypes.bool.isRequired,
  hardwareAcceleration: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  // Advanced
  forceQuit: state.config[TYPE.CONFIG.GENERAL].forceQuit,
  hardwareAcceleration: state.config[TYPE.CONFIG.ADVANCED].hardwareAcceleration
});

export default connect(
  mapStateToProps
)(SettingsGeneral);
