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
  updateConfigGeneral,
  updateConfigParser,
  updateConfigAdvanced
} from '../../actions';

const SettingsLibrary = props => {
  const {
    localized,
    slowSearch,
    reverseScroll,
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
        {t('parser')}
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
  localized: PropTypes.bool.isRequired,
  slowSearch: PropTypes.bool.isRequired,
  reverseScroll: PropTypes.bool.isRequired,
  libraryCache: PropTypes.number.isRequired,
  skipCovers: PropTypes.bool.isRequired,
  parseStrict: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  slowSearch: state.config[TYPE.CONFIG.GENERAL].slowSearch,
  localized: state.config[TYPE.CONFIG.GENERAL].localized,
  reverseScroll: state.config[TYPE.CONFIG.GENERAL].reverseScroll,
  libraryCache: state.config[TYPE.CONFIG.ADVANCED].libraryCache,
  skipCovers: state.config[TYPE.CONFIG.PARSER].skipCovers,
  parseStrict: state.config[TYPE.CONFIG.PARSER].parseStrict
});

export default connect(
  mapStateToProps
)(SettingsLibrary);
