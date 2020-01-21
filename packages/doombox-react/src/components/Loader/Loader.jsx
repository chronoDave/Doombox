import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  CircularProgress
} from '@material-ui/core';

import { Typography } from '../Typography';

const Loader = ({ context }) => {
  const { t } = useTranslation();

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pb={8}
    >
      <CircularProgress />
      <Box zIndex={1} pt={2}>
        <Typography>
          {t('description:loading', { context })}
        </Typography>
      </Box>
    </Box>
  );
};

Loader.propTypes = {
  context: PropTypes.string.isRequired
};

export default Loader;
