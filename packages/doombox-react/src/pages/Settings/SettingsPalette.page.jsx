import React from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';

// Core
import {
  Box,
  Typography
} from '@material-ui/core';

import { Switch } from '../../components';

// Modules
import { FormCreatePalette } from '../../modules';

// Actions
import { updateStorage } from '../../actions';

// Validation
import { propPalette } from '../../validation/propTypes';

const SettingsPalette = ({ palette }) => {
  const updatePalette = payload => updateStorage(
    TYPE.IPC.CONFIG,
    TYPE.CONFIG.PALETTE,
    { ...palette, ...payload }
  );

  return (
    <Box display="flex" flexDirection="column">
      <Switch
        primary="Dark theme"
        checked={palette.darkTheme}
        onChange={event => updatePalette({
          darkTheme: event.target.checked
        })}
        maxWidth={480}
      />
      <Switch
        primary="Background opacity"
        checked={palette.backgroundOpacity}
        onChange={event => updatePalette({
          backgroundOpacity: event.target.checked
        })}
        maxWidth={480}
      />
      <Box py={1} color="grey.500">
        <Typography variant="subtitle1">
          Theme
        </Typography>
      </Box>
      <FormCreatePalette />
    </Box>
  );
};

SettingsPalette.propTypes = {
  palette: propPalette
};

SettingsPalette.defaultProps = {
  palette: {}
};

const mapStateToProps = state => ({
  palette: state.config[TYPE.CONFIG.PALETTE]
});

export default connect(
  mapStateToProps
)(SettingsPalette);
