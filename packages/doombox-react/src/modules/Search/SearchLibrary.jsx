import React, { useState } from 'react';
import { TYPE } from '@doombox/utils';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

// Icons
import IconPlay from '@material-ui/icons/PlaylistPlay';
import IconAdd from '@material-ui/icons/PlaylistAdd';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import {
  InputSearch,
  Tooltip,
  Typography
} from '../../components';

const SearchLibrary = props => {
  const {
    onSearch,
    slowSearch,
    onAdd,
    onPlay,
    count
  } = props;
  const [query, setQuery] = useState('');

  const { t } = useTranslation();

  const debouncedSearch = debounce(value => {
    setQuery(value);
    onSearch(value);
  }, slowSearch ? 100 : 20);

  return (
    <Box display="flex" alignItems="center" height={48}>
      <InputSearch
        id="Library"
        name="Search"
        onChange={debouncedSearch}
      />
      {query !== '' && (
        <Box display="flex" zIndex={1} justifyContent="center">
          <Box
            minWidth={72}
            ml={2}
            mr={1}
            flexShrink={0}
            display="flex"
            alignItems="center"
          >
            <Typography variant="body2" align="right">
              {t('resultCount', { count })}
            </Typography>
          </Box>
          <Tooltip
            disableTranslation
            placement="bottom"
            title={t('action:play', { context: 'selection' })}
          >
            <IconButton onClick={() => onPlay(query)}>
              <IconPlay />
            </IconButton>
          </Tooltip>
          <Tooltip
            disableTranslation
            placement="bottom"
            title={t('action:add', { context: 'playlist' })}
          >
            <IconButton onClick={() => onAdd(query)}>
              <IconAdd />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

SearchLibrary.propTypes = {
  onSearch: PropTypes.func.isRequired,
  slowSearch: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  slowSearch: state.config[TYPE.CONFIG.GENERAL].slowSearch
});

export default connect(
  mapStateToProps
)(SearchLibrary);
