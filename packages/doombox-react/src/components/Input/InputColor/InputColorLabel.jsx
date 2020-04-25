import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../Typography';

const InputColorLabel = ({ children, disableTranslation, label }) => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {children}
      <Box pt={1}>
        <Typography variant="body2">
          {!disableTranslation ? t(label) : label}
        </Typography>
      </Box>
    </Box>
  );
};

InputColorLabel.propTypes = {
  children: PropTypes.node.isRequired,
  disableTranslation: PropTypes.bool,
  label: PropTypes.string.isRequired
};

InputColorLabel.defaultProps = {
  disableTranslation: false
};

export default InputColorLabel;
