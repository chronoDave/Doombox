import React, { createElement } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components/Typography';
import { IconDatabaseRemove } from '../../components/Icon';

// Views
import * as Views from './views';

// Validation
import { propError } from '../../validation/propTypes';

const ErrorPage = props => {
  const {
    error: {
      message,
      locale,
      trace
    },
    remote,
    userError
  } = props;
  const { t } = useTranslation();

  const getView = () => {
    if (userError) return `${remote ? 'Remote' : ''}User`;
    return 'Offline';
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={720}
        p={2}
      >
        <Box fontSize="4em">
          <IconDatabaseRemove fontSize="inherit" />
        </Box>
        <Typography variant="h5" paragraph>
          {t(`error:${locale}`)}
        </Typography>
        {createElement(
          Views[`Error${getView()}View`],
          { message, trace }
        )}
      </Box>
    </Box>
  );
};

ErrorPage.propTypes = {
  error: propError.isRequired,
  remote: PropTypes.bool.isRequired,
  userError: propError
};

ErrorPage.defaultProps = {
  userError: null
};

const mapStateToProps = state => ({
  error: state.system.error,
  remote: state.system.remote,
  userError: state.profile.error
});

export default connect(
  mapStateToProps
)(ErrorPage);
