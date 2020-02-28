import React, { Fragment } from 'react';
import { ACTION } from '@doombox/utils';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  Tooltip,
  ButtonAvatar
} from '../../components';

// Actions
import { fetchPlaylist } from '../../actions';

// Validation
import { propPlaylist } from '../../validation/propTypes';

// Styles
import { useMixographyStyles } from './Mixography.style';

const MixographyItem = props => {
  const {
    active,
    onMenu,
    playlist: {
      _id,
      name,
      src,
      collection
    }
  } = props;

  const { t } = useTranslation();
  const classes = useMixographyStyles();

  const handleClick = () => fetchPlaylist(_id, ACTION.AUDIO.PLAYLIST_SET);

  return (
    <Box display="flex" alignItems="center">
      <Tooltip
        disableTranslation
        title={`${name} (${t('trackCount', { count: collection.length })})`}
        placement="right"
      >
        <ButtonAvatar
          alt={name}
          src={src}
          size={6}
          classes={{ root: classes.itemAvatar }}
          onClick={handleClick}
          onContextMenu={onMenu}
        />
      </Tooltip>
      {name === active && <div className={classes.activeBar} />}
    </Box>
  );
};

MixographyItem.propTypes = {
  active: PropTypes.string,
  onMenu: PropTypes.func.isRequired,
  playlist: propPlaylist.isRequired
};

MixographyItem.defaultProps = {
  active: null
};

export default MixographyItem;
