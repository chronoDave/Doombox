import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { IconDatabaseRemove } from '../components/Icon';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { DialogUpdateConnection } from '../components/Dialog';

const OfflinePage = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <Box p={2}>
          <Box display="flex" flexDirection="column" alignItems="center" pb={4}>
            <Box pb={2}>
              <IconDatabaseRemove fontSize="large" />
            </Box>
            <Typography variant="h5">
              {t('error:mongodb', { context: 'connection' })}
            </Typography>
            <Typography color="grey.100">
              -
            </Typography>
          </Box>
          <Typography align="center">
            {t('error:mongodb', { context: 'connectionWhy' })}
          </Typography>
          <Typography align="center">
            -
          </Typography>
          <Box display="flex" justifyContent="center" pt={4}>
            <Button
              color="error"
              variant="outlined"
              mr={1}
              onClick={() => setOpen(true)}
            >
              {t('edit', { context: 'connection' })}
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
      </Box>
      {/* <DialogUpdateConnection
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        disableBackdropClick
        address={address}
        open={open}
      /> */}
    </Fragment>
  );
};
export default OfflinePage;
