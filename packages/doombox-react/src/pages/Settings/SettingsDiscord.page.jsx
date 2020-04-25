import React, {
  Fragment,
  useState
} from 'react';
import { TYPE } from '@doombox/utils';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icon
import IconRefresh from '@material-ui/icons/Refresh';
import IconHidden from '@material-ui/icons/VisibilityOff';
import IconVisible from '@material-ui/icons/Visibility';

// Core
import {
  Box,
  InputAdornment,
  IconButton
} from '@material-ui/core';

import {
  Typography,
  InputText
} from '../../components';

// Actions
import {
  updateConfigDiscord,
  setToken as setRpcToken
} from '../../actions';

const SettingsDiscord = ({ discordToken }) => {
  const [token, setToken] = useState(null);
  const [visible, setVisible] = useState(false);
  const id = 'settingsDiscord';

  const { t } = useTranslation();

  const handleSubmit = () => {
    updateConfigDiscord({ token });
    setRpcToken(token);
  };

  return (
    <Fragment>
      <Typography variant="h6">
        {t('general')}
      </Typography>
      <Box p={1}>
        <InputText
          id={id}
          name="token_discord"
          description={t('description:field_tokenDiscord')}
          value={token || discordToken || ''}
          type={visible ? 'text' : 'password'}
          onChange={event => setToken(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setVisible(!visible)}>
                  {visible ? <IconVisible /> : <IconHidden />}
                </IconButton>
                <IconButton onClick={handleSubmit}>
                  <IconRefresh />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Fragment>
  );
};

SettingsDiscord.propTypes = {
  discordToken: PropTypes.string
};

SettingsDiscord.defaultProps = {
  discordToken: ''
};

const mapStateToProps = state => ({
  discordToken: state.config[TYPE.CONFIG.DISCORD].token
});

export default connect(
  mapStateToProps
)(SettingsDiscord);
