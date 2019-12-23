import React, {
  useState,
  createElement
} from 'react';
import PropTypes from 'prop-types';

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

import { ModalFade } from '../../components';

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

const SettingsRouter = ({ open, onClose }) => {
  const tabs = [
    { id: 'General', component: SettingsGeneralPage },
    { id: 'Library', component: SettingsLibraryPage },
    { id: 'Discord', component: SettingsDiscordPage },
    { id: 'Keybind', component: SettingsKeybindPage },
    { id: 'Palette', component: SettingsPalettePage }
  ];
  const [visible, setVisible] = useState(4);
  const classes = useSettingsRouterStyles();

  return (
    <ModalFade open={open} onClose={onClose}>
      <Box
        display="flex"
        justifyContent="center"
        px={{ sm: 2, md: 8, lg: 12 }}
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
            {tabs.map(({ id }, index) => (
              <Tab
                key={id}
                value={index}
                label={id}
                id={`vertical-tab-${index}`}
                aria-controls={`vertical-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          maxWidth={600}
          flexGrow={1}
          pl={2}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" gutterBottom>
              {tabs[visible].id}
            </Typography>
            <IconButton onClick={onClose}>
              <IconClose />
            </IconButton>
          </Box>
          <div className={classes.body}>
            {createElement(tabs[visible].component)}
          </div>
        </Box>
      </Box>
    </ModalFade>
  );
};

SettingsRouter.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SettingsRouter;
