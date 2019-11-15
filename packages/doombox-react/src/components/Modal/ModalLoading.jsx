import React from 'react';
import { useTranslation } from 'react-i18next';

// Core
import {
  Box,
  CircularProgress
} from '@material-ui/core';

import { Typography } from '../Typography';

import ModalBase from './ModalBase';

// Utils
import { getRandomInt } from '../../utils';

const ModalScanning = props => {
  const { t } = useTranslation();

  return (
    <ModalBase
      disableButton
      {...props}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
      >
        <Box pb={8}>
          <CircularProgress size={80} />
        </Box>
        <Typography variant="h5">
          {t('description:flavour', { context: getRandomInt(0, 2).toString() })}
        </Typography>
        <Box pt={0.5} color="grey.100">
          <Typography variant="button">
            {t('fetching', { context: 'library' })}
          </Typography>
        </Box>
      </Box>
    </ModalBase>
  );
};

export default ModalScanning;
