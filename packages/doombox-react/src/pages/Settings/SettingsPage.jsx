import React, { useState, createElement } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// Icons
import IconClose from '@material-ui/icons/Cancel';

// Core
import { withStyles, withTheme } from '@material-ui/core/styles';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  IconButton
} from '@material-ui/core';

import { Main } from '../../components/Main';
import { Typography } from '../../components/Typography';

// Views
import * as Views from './views';

// Utils
import { homePath } from '../../paths';

// Style
import SettingsPageStyle from './SettingsPageStyle';

const SettingsPage = ({ theme, classes }) => {
  const { t } = useTranslation();
  const [view, setView] = useState({
    key: 'MyProfileView',
    translation: 'title:myProfile'
  });

  return (
    <Main>
      <Box
        width="100%"
        height="100%"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
      >
        <Box
          p={4}
          display="flex"
          flexGrow={1}
          bgcolor={theme.palette.getAlpha(theme.palette.grey[400], 0.9)}
        >
          <List subheader={(
            <ListSubheader classes={{ root: classes.listSubheaderRoot }} disableSticky>
              <strong>{t('title:userSettings').toUpperCase()}</strong>
            </ListSubheader>
          )}>
            {[
              {
                key: 'MyProfileView',
                translation: 'title:myProfile',
              },
              {
                key: 'ConnectionsView',
                translation: 'connections',
              },
              {
                translation: 'title:appSettings'
              },
              {
                key: 'AppearanceView',
                translation: 'appearance'
              },
              {
                key: 'LanguageView',
                translation: 'language'
              }
            ].map(({ key, translation }) => (
              !key ? (
                <ListSubheader
                  key={translation}
                  classes={{ root: classes.listSubheaderRoot }}
                  disableSticky
                >
                  <strong>{t(translation).toUpperCase()}</strong>
                </ListSubheader>
              ) : (
                <ListItem
                  selected={view.key === key}
                  classes={{
                    root: classes.listItemRoot,
                    selected: classes.listItemSelected
                  }}
                  key={key}
                  button
                  onClick={() => setView({ key, translation })}
                >
                  <ListItemText primary={t(translation)} />
                </ListItem>
              )
            ))}
          </List>
          <Box py={2} pl={4} pr={2} minWidth={300}>
            <Box pb={2}>
              <Typography variant="h4">
                {t(view.translation)}
              </Typography>
            </Box>
            {createElement(Views[view.key], {})}
          </Box>
          <Box
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <IconButton
              component={RouterLink}
              to={homePath}
              color="inherit"
            >
              <IconClose />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Main>
  );
};

SettingsPage.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withTheme(withStyles(
  SettingsPageStyle
)(SettingsPage));
