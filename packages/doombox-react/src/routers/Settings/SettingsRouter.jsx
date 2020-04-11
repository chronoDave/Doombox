import React, {
  useState,
  createElement
} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icon
import IconClose from '@material-ui/icons/Close';

// Core
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Typography
} from '@material-ui/core';

// Pages
import {
  SettingsDiscordPage,
  SettingsGeneralPage,
  SettingsKeybindPage,
  SettingsLibraryPage,
  SettingsPalettePage
} from '../../pages';

// Style
import { useSettingsRouterStyles } from './SettingsRouter.style';

const SettingsRouter = () => {
  const tabs = {
    general: SettingsGeneralPage,
    library: SettingsLibraryPage,
    discord: SettingsDiscordPage,
    // keybind: SettingsKeybindPage,
    // palette: SettingsPalettePage
  };
  const [visible, setVisible] = useState('general');
  const classes = useSettingsRouterStyles();
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="center"
      px={{ xs: 4, md: 8 }}
      py={2}
      width="100%"
      height="100%"
    >
      <Box>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={visible}
          indicatorColor="primary"
          onChange={(event, tab) => setVisible(tab)}
          aria-label="Settings navigation"
        >
          {Object.keys(tabs).map(key => (
            <Tab
              key={key}
              value={key}
              label={key}
              id={`vertical-tab-${key}`}
              aria-controls={`vertical-tabpanel-${key}`}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        maxWidth={1200}
        flexGrow={1}
        pl={2}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" gutterBottom>
            {t(visible)}
          </Typography>
          <IconButton>
            <IconClose />
          </IconButton>
        </Box>
        <div className={classes.body}>
          {createElement(tabs[visible])}
        </div>
      </Box>
    </Box>
  );
};

SettingsRouter.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SettingsRouter;
