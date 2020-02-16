import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components';

const ContainerSettings = ({ children, title, disableTranslation }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Typography variant="h6">
        {!disableTranslation ? t(title) : title}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        py={1}
        width="100%"
      >
        {children}
      </Box>
    </Fragment>
  );
};

ContainerSettings.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  disableTranslation: PropTypes.bool
};

ContainerSettings.defaultProps = {
  disableTranslation: false
};

export default ContainerSettings;
