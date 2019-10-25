import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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

const ModalData = () => {
  const { t } = useTranslation();
  const { current, total, file } = useMessage();
  const ratio = current / total * 100;

  return (
    <Fragment>
      <Typography variant="h5" align="center" paragraph>
        {t('description:processing_scans')}
      </Typography>
      <Box height="3rem">
        <Typography variant="caption" align="center" paragraph>
          {file}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <LinearProgress
          variant="determinate"
          value={Math.round(ratio || 0)}
        />
        <Box pl={1}>
          <Typography>
            {`${Math.round(ratio || 0)}%`}
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
};

const ModalScanning = ({ ...rest }) => (
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
      <ModalData />
    </Box>
  </ModalBase>
);

ModalScanning.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  progress: PropTypes.number
};

ModalScanning.defaultProps = {
  subtitle: null
};

export default ModalScanning;
