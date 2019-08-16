import React from 'react';
import { useTranslation } from 'react-i18next';

// Core
import {
  Box,
  CircularProgress
} from '@material-ui/core';
import { Typography } from '../components/Typography';

// Utils
import { getRandomInt } from '../utils';

const LoadingPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box pb={8}>
        <CircularProgress size={80} />
      </Box>
      <Typography variant="h5">
        {t('description:flavour', { context: getRandomInt(0, 2).toString() })}
      </Typography>
      <Box pt={0.5} color="grey.100">
        <Typography variant="button">
          {t('connecting')}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingPage;
