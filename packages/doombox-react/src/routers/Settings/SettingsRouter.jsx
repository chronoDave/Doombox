import React, {
  useState,
  createElement
} from 'react';
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
  SettingsPalettePage,
  SettingsLibraryPage,
  SettingsAppearancePage
} from '../../pages';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Style
import { useSettingsRouterStyles } from './SettingsRouter.style';

const SettingsRouter = () => {
  const tabs = {
    general: SettingsGeneralPage,
    library: SettingsLibraryPage,
    appearance: SettingsAppearancePage,
    palette: SettingsPalettePage,
    keybind: SettingsKeybindPage,
    discord: SettingsDiscordPage,
  };
  const [visible, setVisible] = useState('general');
  const { setDialog } = useRoute(HOOK.ROUTE.METHOD);
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
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={visible}
        indicatorColor="primary"
        onChange={(event, tab) => setVisible(tab)}
        aria-label="Settings navigation"
        classes={{
          root: classes.tabsRoot,
          flexContainer: classes.tabsContainer
        }}
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
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        maxWidth={1200}
        flexGrow={1}
        pl={2}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl={1}
          mb={1}
        >
          <Typography variant="h4">
            {t(visible)}
          </Typography>
          <IconButton onClick={() => setDialog(null)}>
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

export default SettingsRouter;
