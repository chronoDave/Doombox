import React, {
  Fragment,
  useState
} from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icons
import IconSave from '@material-ui/icons/SaveAlt';

// Core
import {
  InputAdornment,
  IconButton,
  Box
} from '@material-ui/core';

import {
  Typography,
  InputText
} from '../../components';

// Actions
import { updateConfigKeybind } from '../../actions';

const SettingsKeybind = ({ keybinds }) => {
  const [keybind, setKeybind] = useState({});

  const { t } = useTranslation();

  const id = 'settingsKeybind';

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        {t('player')}
      </Typography>
      <Typography color="error">
        {t('description:restartRequired')}
      </Typography>
      <Box p={1}>
        {Object.entries(keybinds).map(([key, value]) => (
          <InputText
            id={id}
            name={key}
            value={keybind[key] || value || ''}
            disableDescription
            onChange={event => setKeybind({
              ...keybind,
              [key]: event.target.value
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => updateConfigKeybind({ [key]: keybind[key] })}>
                    <IconSave />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        ))}
      </Box>
    </Fragment>
  );
};

SettingsKeybind.propTypes = {
  keybinds: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  keybinds: state.config[TYPE.CONFIG.KEYBIND]
});

export default connect(
  mapStateToProps
)(SettingsKeybind);
