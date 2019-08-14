import React, { useState, createElement } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// Icons
import IconClose from '@material-ui/icons/Cancel';

// Core
import {
  withTheme,
  fade
} from '@material-ui/core/styles';
import {
  Box,
  IconButton
} from '@material-ui/core';

import { Main } from '../../components/Main';
import { Typography } from '../../components/Typography';
import { List } from '../../components/List';

// Views
import * as Views from './views';

// Utils
import { homePath } from '../../paths';

const SettingsPage = ({ theme }) => {
  const { t } = useTranslation();
  const [view, setView] = useState('myProfile');

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
          bgcolor={fade(theme.palette.grey[300], 0.66)}
        >
          <List
            active={view}
            items={[
              { key: 'title:userSettings' },
              { key: 'myProfile', onClick: () => setView('myProfile') },
              { key: 'connections', onClick: () => setView('connections') },
              { key: 'title:appSettings' },
              { key: 'appearance', onClick: () => setView('appearance') },
              { key: 'language', onClick: () => setView('language') }
            ]}
          />
          <Box py={2} pl={4} pr={2} minWidth={300}>
            <Box pb={2}>
              <Typography variant="h4">
                {t(view)}
              </Typography>
            </Box>
            {createElement(Views[
              `${view.slice(0, 1).toUpperCase()}${view.slice(1)}View`
            ], {})}
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
  theme: PropTypes.object.isRequired
};

export default withTheme(SettingsPage);
