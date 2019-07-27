import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components/Typography';

const OfflinePage = ({ error: { name } }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
    >
      <Typography>
        {name}
      </Typography>
    </Box>
  );
};

OfflinePage.propTypes = {
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  error: state.system.error
});

export default connect(
  mapStateToProps
)(OfflinePage);
