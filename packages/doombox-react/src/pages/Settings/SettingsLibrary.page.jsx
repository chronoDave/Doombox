import React, { Fragment } from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  MenuItem,
  Switch
} from '@material-ui/core';

import {
  Typography,
  TypographyField,
  SwitchLabel
} from '../../components';

import { ManagerLibrary } from '../../modules';

// Actions
import {
  updateConfigParser,
  updateConfigAdvanced
} from '../../actions';

const SettingsLibrary = props => {
  const {
    libraryCache,
    skipCovers,
    parseStrict
  } = props;
  const id = 'settingsLibrary';

  const { t } = useTranslation();

  return (
    <Fragment>
      <Typography variant="h6">
        {t('general')}
      </Typography>
      <Box p={1}>
        <SwitchLabel id={id} name="parseStrict">
          <Switch
            checked={parseStrict}
            onChange={event => updateConfigParser({
              parseStrict: event.target.checked
            })}
          />
        </SwitchLabel>
        <SwitchLabel id={id} name="skipCovers">
          <Switch
            checked={skipCovers}
            onChange={event => updateConfigParser({
              skipCovers: event.target.checked
            })}
          />
        </SwitchLabel>
        <TypographyField
          select
          id={id}
          name="libraryCache"
          value={libraryCache}
          onChange={event => updateConfigAdvanced({
            libraryCache: event.target.value
          })}
        >
          <MenuItem value={10}>
            {t('minimal')}
          </MenuItem>
          <MenuItem value={25}>
            {t('optimal')}
          </MenuItem>
          <MenuItem value={50}>
            {t('overkill')}
          </MenuItem>
        </TypographyField>
      </Box>
      <Typography variant="h6">
        {t('folders')}
      </Typography>
      <Box px={1} pt={2} flexGrow={1}>
        <ManagerLibrary />
      </Box>
    </Fragment>
  );
};

SettingsLibrary.propTypes = {
  libraryCache: PropTypes.number.isRequired,
  skipCovers: PropTypes.bool.isRequired,
  parseStrict: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  libraryCache: state.config[TYPE.CONFIG.ADVANCED].libraryCache,
  skipCovers: state.config[TYPE.CONFIG.PARSER].skipCovers,
  parseStrict: state.config[TYPE.CONFIG.PARSER].parseStrict
});

export default connect(
  mapStateToProps
)(SettingsLibrary);
