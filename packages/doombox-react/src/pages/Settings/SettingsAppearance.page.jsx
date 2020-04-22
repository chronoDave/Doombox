import React, { Fragment } from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  Switch
} from '@material-ui/core';

import {
  Typography,
  SwitchLabel
} from '../../components';

// Actions
import {
  updateConfigGeneral,
  updateConfigPalette
} from '../../actions';

const SettingsAppearance = props => {
  const {
    darkTheme,
    dense,
    background,
    backgroundOpacity
  } = props;
  const id = 'settingsAppearance';

  const { t } = useTranslation();

  return (
    <Fragment>
      <Typography variant="h6">
        {t('general')}
      </Typography>
      <Box p={1}>
        <SwitchLabel id={id} name="darkTheme">
          <Switch
            checked={darkTheme}
            onChange={event => updateConfigPalette({
              darkTheme: event.target.checked
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
      </Box>
    </Fragment>
  );
};

SettingsAppearance.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  dense: PropTypes.bool.isRequired,
  background: PropTypes.bool.isRequired,
  backgroundOpacity: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  // Appearance
  darkTheme: state.config[TYPE.CONFIG.PALETTE].darkTheme,
  dense: state.config[TYPE.CONFIG.GENERAL].dense,
  background: state.config[TYPE.CONFIG.GENERAL].background,
  backgroundOpacity: state.config[TYPE.CONFIG.PALETTE].backgroundOpacity,
});

export default connect(
  mapStateToProps
)(SettingsAppearance);
