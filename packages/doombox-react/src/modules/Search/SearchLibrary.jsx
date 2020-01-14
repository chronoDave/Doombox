import React, {
  Fragment,
  useState
} from 'react';
import { TYPE } from '@doombox/utils';
import { useTranslation } from 'react-i18next';

// Icons
import IconClear from '@material-ui/icons/Clear';
import IconPlaylistCreate from '@material-ui/icons/PlaylistAdd';

// Core
import {
  Box,
  ButtonBase,
  IconButton
} from '@material-ui/core';

import {
  InputSearch,
  Typography
} from '../../components';

// Modules
import { PopoverCreatePlaylist } from '../Popover';

// Hooks
import {
  useAudio,
  useIpc
} from '../../hooks';

// Actions
import { queryLibrary } from '../../actions';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useSearchStyles } from './Search.style';

const SearchBarLibrary = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searched, setSearched] = useState(false);

  const collection = useAudio(HOOK.AUDIO.LIBRARY);
  const { search } = useIpc(HOOK.IPC.CONFIG);

  const classes = useSearchStyles();
  const { t } = useTranslation();

  const handleDebounce = value => {
    queryLibrary(value);
    setSearched(value.length > 0);
  };

  return (
    <Fragment>
      <Box display="flex" alignItems="baseline">
        <InputSearch
          id="search"
          name="search"
          onDebounce={handleDebounce}
          debouceTime={search[TYPE.OPTIONS.SLOW_SEARCH] ? 200 : 50}
          endAdornment={searched ? (({ onCancel }) => (
            <ButtonBase
              disableRipple
              classes={{ root: classes.iconCancel }}
              onClick={onCancel}
            >
              <IconClear />
            </ButtonBase>
          )) : null}
        />
        {searched && (
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
                {t('resultCount', { count: collection.length })}
              </Typography>
            </Box>
            <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
              <IconPlaylistCreate />
            </IconButton>
          </Box>
        )}
      </Box>
      <PopoverCreatePlaylist
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        collection={collection}
      />
    </Fragment>
  );
};

export default SearchBarLibrary;