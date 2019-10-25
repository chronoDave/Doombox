import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components/Typography';

const MainViewTemplate = ({ title, subtitle, children }) => {
  const { t } = useTranslation();

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      height="100vh"
    >
      <Box display="flex" flexDirection="column" py={2}>
        <Typography variant="h4">
          {title.t || t(title.key, { context: title.context || '' })}
        </Typography>
        <Typography>
          {subtitle}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

MainViewTemplate.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      t: PropTypes.func,
      key: PropTypes.string,
      context: PropTypes.string
    })
  ]).isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired
};

MainViewTemplate.defaultProps = {
  subtitle: ''
};

export default MainViewTemplate;
