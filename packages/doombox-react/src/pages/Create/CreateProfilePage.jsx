import React from 'react';
import { useTranslation } from 'react-i18next';

// Core
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  useMediaQuery,
  Hidden
} from '@material-ui/core';

import { BackgroundProvider } from '../../components/Background';
import { FormCreateProfile } from '../../components/Form';
import { Typography } from '../../components/Typography';

// Utils
import { version } from '../../../package.json';

const CreateProfilePage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <BackgroundProvider>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection={isDownSm ? 'column' : 'row-reverse'}
        alignItems="center"
        height="100%"
        minHeight="min-content"
        p={4}
      >
        <Box
          pb={isDownSm ? 4 : 0}
          display="flex"
          justifyContent="center"
          flexGrow={isDownSm ? 0 : 0.33}
        >
          <Box>
            <Box display="flex" alignItems="baseline">
              <Typography variant="h1">
                Doombox
              </Typography>
              <Hidden smDown>
                <Box pl={1}>
                  <Typography color="grey">
                    {version}
                  </Typography>
                </Box>
              </Hidden>
            </Box>
            <Typography
              variant={isDownSm ? 'body1' : 'h4'}
              color="grey"
              align={isDownSm ? 'center' : 'left'}
            >
              {isDownSm ? version : t('slogan')}
            </Typography>
          </Box>
        </Box>
        <Card>
          <Box pt={3}>
            <Typography variant="h6" align="center">
              {t('title:createProfile')}
            </Typography>
          </Box>
          <Box p={3} pb={2} minWidth={300}>
            <FormCreateProfile />
          </Box>
        </Card>
      </Box>
    </BackgroundProvider>
  );
};

export default CreateProfilePage;
