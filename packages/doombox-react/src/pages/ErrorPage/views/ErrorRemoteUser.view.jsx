import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// Icon
import IconVisible from '@material-ui/icons/Visibility';
import IconHidden from '@material-ui/icons/VisibilityOff';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';

// Api
import { getOfflineCache } from '../../../api';

const ErrorRemoteUser = ({ message, trace }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Box display="flex" flexDirection="column">
      <Typography>
        {message}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        pl={3}
        pr={1}
        py={2}
        borderRadius="borderRadius"
        bgcolor="grey.500"
        border={1}
        borderColor="grey.600"
      >
        <Typography
          align="center"
          color="grey.100"
          breakWord
        >
          {visible ? trace : '*'.repeat(trace.length)}
        </Typography>
        <Box ml={1} color="grey.50">
          <IconButton
            onClick={() => setVisible(!visible)}
            color="inherit"
          >
            {visible ? <IconVisible /> : <IconHidden />}
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" pt={3}>
        <Button
          onClick={() => dispatch(getOfflineCache())}
          ml={1}
        >
          {t('offline', { context: 'go' })}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => window.location.reload(true)}
          ml={1}
        >
          {t('retry')}
        </Button>
      </Box>
    </Box>
  );
};

ErrorRemoteUser.propTypes = {
  message: PropTypes.string.isRequired,
  trace: PropTypes.string.isRequired
};

export default ErrorRemoteUser;
