import React, {
  useState,
  useEffect,
  createElement
} from 'react';
import { useTranslation } from 'react-i18next';

// Icons
import IconClose from '@material-ui/icons/Cancel';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import { Main } from '../../components/Main';
import { Typography } from '../../components/Typography';
import { List } from '../../components/List';
import { useRouter } from '../../components/Router';
import { BackgroundFade } from '../../components/Background';

// Paths
import { HOME_PATH } from '../../paths';

// Views
import * as Views from './views';

const SettingsPage = () => {
  const { t } = useTranslation();
  const [view, setView] = useState('myProfile');
  const { setPath } = useRouter();

  useEffect(() => {
    const handleExit = event => {
      // Escape
      if (event.keyCode === 27) {
        setPath(HOME_PATH);
      }
    };

    document.addEventListener('keydown', handleExit);

    // Cleanup
    return () => document.removeEventListener('keydown', handleExit);
  }, []);

  return (
    <Main>
      <BackgroundFade />
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
              color="inherit"
              onClick={() => setPath(HOME_PATH)}
            >
              <IconClose />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Main>
  );
};

export default SettingsPage;
