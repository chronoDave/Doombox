import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { ImageBackground } from '../../components';

// Modules
import {
  Search,
  Label
} from '../../modules';

// Actions
import {
  fetchLabels,
  queryLabels
} from '../../actions';

// Utils
import { createRegexPayload } from '../../utils';

const LibraryLabelPage = ({ size }) => {
  const operator = 'or';
  const fields = [
    'metadata.album',
    'metadata.albumartist'
  ];

  const handleSearch = search => {
    if (search) {
      queryLabels(createRegexPayload(search, fields, operator));
    } else {
      fetchLabels();
    }
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <ImageBackground />
      <Box px={2} py={1}>
        <Search
          id="label"
          fields={fields}
          operator={operator}
          onSearch={handleSearch}
          count={size}
        />
      </Box>
      <Box flexGrow={1}>
        <Label />
      </Box>
    </Box>
  );
};

LibraryLabelPage.propTypes = {
  size: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  size: state.label.size
});

export default connect(
  mapStateToProps
)(LibraryLabelPage);
