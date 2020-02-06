import React, { useState } from 'react';
import {
  ACTION,
  TYPE
} from '@doombox/utils';
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

// Actions
import { fetchPlaylist } from '../../actions';

// Utils
import { createRegexPayload } from '../../utils';

const Search = props => {
  const {
    id,
    onSearch,
    slowSearch,
    count,
    fields,
    operator
  } = props;
  const [query, setQuery] = useState('');

  const { t } = useTranslation();

  const debouncedSearch = debounce(value => {
    setQuery(value);
    onSearch(value);
  }, slowSearch ? 100 : 20);

  const handlePlaylist = action => fetchPlaylist(id, action, {
    name: query,
    regex: createRegexPayload(query, fields, operator)
  });

  return (
    <Box display="flex" alignItems="center" height={48}>
      <InputSearch
        id={id}
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
            <IconButton onClick={() => handlePlaylist(ACTION.AUDIO.PLAYLIST_SET)}>
              <IconPlay />
            </IconButton>
          </Tooltip>
          <Tooltip
            disableTranslation
            placement="bottom"
            title={t('action:add', { context: 'playlist' })}
          >
            <IconButton onClick={() => handlePlaylist(ACTION.AUDIO.PLAYLIST_ADD)}>
              <IconAdd />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

Search.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  operator: PropTypes.oneOf([
    'and',
    'or'
  ]),
  onSearch: PropTypes.func.isRequired,
  slowSearch: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired
};

Search.defaultProps = {
  operator: 'or'
};

const mapStateToProps = state => ({
  slowSearch: state.config[TYPE.CONFIG.GENERAL].slowSearch
});

export default connect(
  mapStateToProps
)(Search);
