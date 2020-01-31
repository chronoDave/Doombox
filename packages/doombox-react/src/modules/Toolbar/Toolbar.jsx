import React, {
  Fragment,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icons
import IconMenu from '@material-ui/icons/MoreVert';
import IconPlay from '@material-ui/icons/PlaylistPlay';
import IconShuffle from '@material-ui/icons/Shuffle';

// Core
import {
  Box,
  Hidden,
  IconButton
} from '@material-ui/core';

import {
  Context,
  ContextItem,
  Tooltip
} from '../../components';

// Modules
import { SearchLibrary } from '../Search';

const Toolbar = ({ onPlay, onShuffle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation();

  return (
    <Fragment>
      <Box
        display="flex"
        alignItems="center"
        p={1}
        justifyContent="space-between"
      >
        <SearchLibrary />
        <Hidden smUp>
          <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
            <IconMenu />
          </IconButton>
        </Hidden>
        <Hidden xsDown>
          <Box display="flex">
            <Tooltip
              disableTranslation
              title={t('action:play', { context: 'library' })}
            >
              <IconButton onClick={onPlay}>
                <IconPlay />
              </IconButton>
            </Tooltip>
            <Tooltip
              disableTranslation
              title={t('action:shuffle', { context: 'library' })}
            >
              <IconButton onClick={onShuffle}>
                <IconShuffle />
              </IconButton>
            </Tooltip>
          </Box>
        </Hidden>
      </Box>
      <Context
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        position="left"
      >
        <ContextItem
          disableTranslation
          primary={t('action:play', { context: 'library' })}
          onClick={onPlay}
        />
        <ContextItem
          disableTranslation
          primary={t('action:shuffle', { context: 'library' })}
          onClick={onShuffle}
        />
      </Context>
    </Fragment>
  );
};

Toolbar.propTypes = {
  onPlay: PropTypes.func.isRequired,
  onShuffle: PropTypes.func.isRequired
};

export default Toolbar;
