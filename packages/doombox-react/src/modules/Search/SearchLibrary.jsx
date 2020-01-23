import React, {
  Fragment,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';

// Icons
import IconPlaylistAdd from '@material-ui/icons/PlaylistAdd';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import {
  Popover,
  Tooltip,
  Button
} from '../../components';

// Modules
import { FormPlaylist } from '../Form';

// Hooks
import { useAudio } from '../../hooks';

// Actions
import { createPlaylist } from '../../actions';

// Utils
import { HOOK } from '../../utils/const';

import SearchBase from './SearchBase';

const SearchBarLibrary = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const collection = useAudio(HOOK.AUDIO.LIBRARY);
  const { t } = useTranslation();

  return (
    <Fragment>
      <SearchBase name="library" count={collection.length}>
        <Tooltip
          disableTranslation
          placement="bottom"
          title={t('action:create', { context: 'playlist' })}
        >
          <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
            <IconPlaylistAdd />
          </IconButton>
        </Tooltip>
      </SearchBase>
      <Popover
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        position="top"
      >
        <Box p={2}>
          <FormPlaylist
            onSubmit={payload => createPlaylist({ ...payload, collection })}
            actions={(
              <Button onClick={() => setAnchorEl(null)}>
                {t('action:cancel')}
              </Button>
            )}
          />
        </Box>
      </Popover>
    </Fragment>
  );
};

export default SearchBarLibrary;
