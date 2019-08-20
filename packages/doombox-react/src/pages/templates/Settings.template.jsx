import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icons
import IconClose from '@material-ui/icons/Cancel';

// Core
import { Box, IconButton } from '@material-ui/core';

import { BackgroundFade } from '../../components/Background';
import { useRoute } from '../../components/Router';
import { List } from '../../components/List';
import { Typography } from '../../components/Typography';

// Const
import { VIEWS } from '../../constants';

const SettingsTemplate = ({ children }) => {
  const { view, setView } = useRoute();
  const { t } = useTranslation();

  useEffect(() => {
    const handleExit = event => {
      if (event.keyCode === 27) setView(VIEWS.ALBUM);
    };

    document.addEventListener('keydown', handleExit);
    return () => document.removeEventListener('keydown', handleExit);
  });

  return (
    <Fragment>
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
            active={view.toLowerCase()}
            items={[
              { key: 'title:userSettings' },
              { key: 'profile', onClick: () => setView(VIEWS.PROFILE) },
              { key: 'connections', onClick: () => setView(VIEWS.CONNECTIONS) },
              { key: 'title:appSettings' },
              { key: 'appearance', onClick: () => setView(VIEWS.APPEARANCE) },
              { key: 'language', onClick: () => setView(VIEWS.LANGUAGE) }
            ]}
          />
          <Box py={2} pl={4} pr={2} minWidth={300}>
            <Box pb={2}>
              <Typography variant="h4">
                {t(view.toLowerCase())}
              </Typography>
            </Box>
            {children}
          </Box>
          <Box
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <IconButton
              color="inherit"
              onClick={() => setView(VIEWS.ALBUM)}
            >
              <IconClose />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

SettingsTemplate.propTypes = {
  children: PropTypes.node.isRequired
};

export default SettingsTemplate;
