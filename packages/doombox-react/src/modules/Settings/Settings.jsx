import React, { useState, createElement } from 'react';
import { useTranslation } from 'react-i18next';

// Core
import {
  Box,
  Card,
  Tabs,
  Tab
} from '@material-ui/core';

import { Typography } from '../../components/Typography';
import { ModalBase } from '../../components/Modal';

// Views
import * as Views from './views';

// Utils
import { SETTINGS_VIEWS } from '../../utils/const';

// Style
import { useSettingsStyle } from './Settings.style';

const ModalSettings = props => {
  const tabs = Object.values(SETTINGS_VIEWS);
  const { t } = useTranslation();
  const classes = useSettingsStyle();
  const [value, setValue] = useState(tabs[0]);

  return (
    <ModalBase {...props}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        indicatorColor="primary"
        onChange={(event, newValue) => setValue(newValue)}
        aria-label="Settings navigation"
        classes={{ root: classes.tabsRoot }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            label={t(tab.toLowerCase())}
            value={tab}
            id={`vertical-tab-${index}`}
            aria-controls={`vertical-tabpanel-${index}`}
            classes={{ textColorInherit: classes.tabRoot }}
          />
        ))}
      </Tabs>
      <Box
        flexGrow={1}
        p={4}
        pt={2}
        display="flex"
        flexDirection="column"
        height="100%"
        overflow="auto"
      >
        <Typography variant="h4">
          {t(value.toLowerCase())}
        </Typography>
        <Box py={3}>
          <Card>
            {createElement(Views[`Settings${value}View`])}
          </Card>
        </Box>
      </Box>
    </ModalBase>
  );
};

export default ModalSettings;
