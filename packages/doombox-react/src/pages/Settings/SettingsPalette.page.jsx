import React, { Fragment } from 'react';
import { TYPE, CONFIG } from '@doombox/utils';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components';

import { Palette } from '../../modules';

// Actions
import { updateConfigPalette } from '../../actions';

const SettingsPalette = ({ primary, secondary }) => {
  const id = 'settingsPalette';

  const { t } = useTranslation();

  return (
    <Fragment>
      <Typography variant="h6">
        {t('primary')}
      </Typography>
      <Box p={1}>
        <Palette
          id={id}
          name="primary"
          value={primary}
          defaultValue={CONFIG[TYPE.CONFIG.PALETTE].primary}
          onChange={{
            main: main => updateConfigPalette({
              primary: { ...primary, main }
            }),
            dark: dark => updateConfigPalette({
              primary: { ...primary, dark }
            }),
            light: light => updateConfigPalette({
              primary: { ...primary, light }
            }),
            contrastText: contrastText => updateConfigPalette({
              primary: { ...primary, contrastText }
            })
          }}
        />
      </Box>
      <Typography variant="h6">
        {t('secondary')}
      </Typography>
      <Box p={1}>
        <Palette
          id={id}
          name="secondary"
          value={secondary}
          defaultValue={CONFIG[TYPE.CONFIG.PALETTE].secondary}
          onChange={{
            main: main => updateConfigPalette({
              secondary: { ...secondary, main }
            }),
            dark: dark => updateConfigPalette({
              secondary: { ...secondary, dark }
            }),
            light: light => updateConfigPalette({
              secondary: { ...secondary, light }
            }),
            contrastText: contrastText => updateConfigPalette({
              secondary: { ...secondary, contrastText }
            })
          }}
        />
      </Box>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  primary: state.config[TYPE.CONFIG.PALETTE].primary,
  secondary: state.config[TYPE.CONFIG.PALETTE].secondary
});

export default connect(
  mapStateToProps
)(SettingsPalette);
