import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import {
  List,
  MenuItem,
  ListItemText
} from '@material-ui/core';

import Context from './Context';
import { MenuItemInteractive } from '../MenuItem';

// Api
import { updatePlaylist } from '../../api';

// Validation
import { propSong } from '../../validation/propTypes';

const ContextSong = props => {
  const {
    addToPlaylist,
    collection,
    song,
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <Context
      id="song"
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      {...rest}
    >
      <MenuItemInteractive
        popper={(
          <List disablePadding>
            {collection.map(playlist => (
              <MenuItem
                key={playlist._id}
                onClick={() => addToPlaylist(playlist._id, [...playlist.songs || [], song])}
              >
                <ListItemText primary={playlist.title} />
              </MenuItem>
            ))}
          </List>
        )}
        primary={t('add', { context: 'playlist' })}
      />
    </Context>
  );
};

const mapStateToProps = state => ({
  collection: state.playlist.collection
});

const mapDispatchToProps = dispatch => ({
  addToPlaylist: (_id, songs) => dispatch(updatePlaylist(_id, { $set: { songs } }))
});

ContextSong.propTypes = {
  addToPlaylist: PropTypes.func.isRequired,
  collection: PropTypes.arrayOf(propSong).isRequired,
  song: propSong.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContextSong);
