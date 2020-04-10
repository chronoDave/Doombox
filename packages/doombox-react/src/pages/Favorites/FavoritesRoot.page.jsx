import React, { useState } from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  ImageBackground,
  Tooltip
} from '../../components';

// Modules
import {
  SearchFavorites,
  VirtualFavorites
} from '../../modules';

// Redux
import {
  addPlaylist,
  setPlaylist
} from '../../redux';

// Validation
import { propSong } from '../../validation/propTypes';

const FavoritesRootPage = props => {
  const {
    favorites,
    dense,
    dispatchAddPlaylist,
    dispatchSetPlaylist
  } = props;
  const [filtered, setFiltered] = useState(null);

  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <ImageBackground />
      <Box
        display="flex"
        justifyContent="space-between"
        px={2}
        py={1}
        zIndex={1}
      >
        <SearchFavorites
          favorites={favorites}
          setResult={setFiltered}
        />
        <Box display="flex">
          <Tooltip
            disableTranslation
            placement="bottom"
            title={t('action:play', { context: 'favorites' })}
          >
            <IconButton
              onClick={() => dispatchSetPlaylist({
                name: t('favorites'),
                collection: filtered || favorites
              })}
            >
              <IconPlay />
            </IconButton>
          </Tooltip>
          <Tooltip
            disableTranslation
            placement="bottom"
            title={t('action:add', { context: 'playlist' })}
          >
            <IconButton onClick={() => dispatchAddPlaylist(filtered || favorites)}>
              <IconAdd />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box flexGrow={1} zIndex={1}>
        <VirtualFavorites favorites={filtered || favorites} dense={dense} />
      </Box>
    </Box>
  );
};

FavoritesRootPage.propTypes = {
  favorites: PropTypes.arrayOf(propSong).isRequired,
  dense: PropTypes.bool.isRequired,
  dispatchAddPlaylist: PropTypes.func.isRequired,
  dispatchSetPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dense: state.config[TYPE.CONFIG.GENERAL].dense,
  favorites: state.favorites
});

const mapDispatchToProps = {
  dispatchSetPlaylist: setPlaylist,
  dispatchAddPlaylist: addPlaylist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesRootPage);
