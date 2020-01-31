import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

// Icons
import IconPlay from '@material-ui/icons/PlaylistPlay';
import IconAdd from '@material-ui/icons/PlaylistAdd';

// Core
import { IconButton } from '@material-ui/core';

import { Tooltip } from '../../components';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

import SearchBase from './SearchBase';

const SearchBarLibrary = () => {
  const {
    addPlaylist,
    setPlaylist,
    createSong
  } = useAudio(HOOK.AUDIO.METHOD);
  const library = useAudio(HOOK.AUDIO.LIBRARY);
  const { t } = useTranslation();

  return (
    <SearchBase name="library" count={library.length}>
      {({ query }) => (
        <Fragment>
          <Tooltip
            disableTranslation
            placement="bottom"
            title={t('action:play', { context: 'selection' })}
          >
            <IconButton
              onClick={() => {
                setPlaylist(query, library);
                createSong();
              }}
            >
              <IconPlay />
            </IconButton>
          </Tooltip>
          <Tooltip
            disableTranslation
            placement="bottom"
            title={t('action:add', { context: 'playlist' })}
          >
            <IconButton onClick={() => addPlaylist(library)}>
              <IconAdd />
            </IconButton>
          </Tooltip>
        </Fragment>
      )}
    </SearchBase>
  );
};

export default SearchBarLibrary;
