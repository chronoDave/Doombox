import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  Tooltip,
  ButtonAvatar
} from '../../components';

// Actions
import { playPlaylist } from '../../actions';

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
      cover,
      collection
    }
  } = props;

  const { t } = useTranslation();
  const classes = useMixographyStyles();

  return (
    <Box display="flex" alignItems="center">
      <Tooltip
        disableTranslation
        title={`${name} (${t('trackCount', { count: collection.length })})`}
        placement="right"
      >
        <ButtonAvatar
          alt={name}
          src={cover && (cover.path || cover.file || null)}
          size={6}
          classes={{ root: classes.itemAvatar }}
          onClick={() => playPlaylist(_id)}
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
