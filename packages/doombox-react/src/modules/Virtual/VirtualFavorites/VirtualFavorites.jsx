import React, {
  Fragment,
  useState
} from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { useTheme } from '@material-ui/core/styles';

import {
  Context,
  ContextItem
} from '../../../components';

import VirtualFavoritesItem from './VirtualFavoritesItem.private';

// Actions
import { removeFavorite } from '../../../actions';

// Hooks
import { useAudio } from '../../../hooks';

// Utils
import { HOOK } from '../../../utils/const';

// Validation
import { propSong } from '../../../validation/propTypes';

// Styles
import { useVirtualFavoritesStyle } from './VirtualFavorites.style';

const VirtualFavorites = ({ favorites, dense }) => {
  const [menu, setMenu] = useState({ anchor: null, payload: null });

  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useVirtualFavoritesStyle();

  const { createSong } = useAudio(HOOK.AUDIO.METHOD);
  const { _id: currentId } = useAudio(HOOK.AUDIO.CURRENT);

  const handleCloseMenu = () => setMenu({ ...menu, anchor: null });

  const itemData = {
    classes,
    dense,
    current: currentId,
    createSong,
    setMenu,
    favorites
  };

  return (
    <Fragment>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            // General
            width={width}
            height={height}
            // Items
            itemCount={favorites.length}
            itemData={itemData}
            itemSize={theme.spacing(dense ? 6.5 : 7)}
          >
            {VirtualFavoritesItem}
          </FixedSizeList>
        )}
      </AutoSizer>
      <Context
        anchorEl={menu.anchor}
        onClose={handleCloseMenu}
        position="bottom"
      >
        <ContextItem
          disableTranslation
          primary={t('action:remove', { context: 'favorite' })}
          onClick={() => removeFavorite(menu.payload)}
        />
      </Context>
    </Fragment>
  );
};

VirtualFavorites.propTypes = {
  favorites: PropTypes.arrayOf(propSong).isRequired,
  dense: PropTypes.bool.isRequired
};

export default VirtualFavorites;
