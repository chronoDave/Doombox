import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import {
  MenuItem,
  ListItemText
} from '@material-ui/core';

import Context from './Context';

// Hooks
import { useAudio } from '../../hooks';

// Api
import {
  updateUser,
  deletePlaylist
} from '../../api';

// Utils
import { REDUCER, AUDIO_HOOKS } from '../../utils/const';

// Validation
import {
  propUser,
  propPlaylist
} from '../../validation/propTypes';

const ContextPlaylist = props => {
  const {
    profile,
    current,
    deleteCollection,
    updatePlaylist,
    updateProfile,
    onClose,
    ...rest
  } = props;
  const { t } = useTranslation();
  const { set } = useAudio(AUDIO_HOOKS.STATIC);

  return (
    <Context
      id="playlist"
      onClose={onClose}
      {...rest}
    >
      <MenuItem
        onClick={() => {
          set(current.songs || []);
          updatePlaylist(current);
        }}
      >
        <ListItemText primary={t('play', { context: 'all' })} />
      </MenuItem>
      <MenuItem
        onClick={() => {
          updateProfile(profile._id, { $pull: { playlist: current._id } });
          deletePlaylist(current._id);
          onClose();
        }}
      >
        <ListItemText primary={t('delete', { context: 'playlist' })} />
      </MenuItem>
    </Context>
  );
};

const mapStateToProps = state => ({
  profile: state.profile.user
});

const mapDispatchToProps = dispatch => ({
  deleteCollection: _id => dispatch(deletePlaylist(_id)),
  updatePlaylist: playlist => dispatch({
    type: REDUCER.SET_PLAYLIST_CURRENT,
    payload: playlist
  }),
  updateProfile: (_id, modifiers) => dispatch(updateUser(_id, modifiers))
});

ContextPlaylist.propTypes = {
  profile: propUser.isRequired,
  current: propPlaylist.isRequired,
  deleteCollection: PropTypes.func.isRequired,
  updatePlaylist: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContextPlaylist);
