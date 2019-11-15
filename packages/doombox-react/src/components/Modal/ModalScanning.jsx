import React, { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// Core
import {
  Box,
  LinearProgress
} from '@material-ui/core';

import { Typography } from '../Typography';

import ModalBase from './ModalBase';

// Hooks
import { useMessage } from '../../hooks';

const DataFile = () => {
  const { file } = useMessage();

  return (
    <Typography variant="caption" align="center" paragraph>
      {file}
    </Typography>
  );
};

const DataProgress = () => {
  const { current, total } = useMessage();
  const ratio = current / total * 100;

  return useMemo(() => (
    <Fragment>
      <LinearProgress
        variant="determinate"
        value={Math.round(ratio || 0)}
      />
      <Box pl={1}>
        <Typography>
          {`${Math.round(ratio || 0)}%`}
        </Typography>
      </Box>
    </Fragment>
  ), [current, total]);
};

const ModalScanning = ({ ...rest }) => {
  const { t } = useTranslation();

  return (
    <ModalBase
      disableButton
      maxWidth={720}
      {...rest}
    >
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="h5" align="center" paragraph>
          {t('description:processing_scans')}
        </Typography>
        <Box height="3rem">
          <DataFile />
        </Box>
        <Box display="flex" alignItems="center">
          <DataProgress />
        </Box>
      </Box>
    </ModalBase>
  );
};

export default ModalScanning;
