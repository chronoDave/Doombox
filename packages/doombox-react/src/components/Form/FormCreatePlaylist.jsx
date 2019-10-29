import React from 'react';
import {
  Formik,
  Form,
  ErrorMessage
} from 'formik';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import shortid from 'shortid';
import PropTypes from 'prop-types';

// Validation
import { schemaPlaylist } from '@doombox/utils/validation/schema';

// Core
import { Box } from '@material-ui/core';

import { Button } from '../Button';
import {
  FieldText,
  FieldFileAvatar
} from '../Field';

// Api
import {
  updateUser,
  createPlaylist
} from '../../api';

// Utils
import { propUser } from '../../validation/propTypes';

const FormCreatePlaylist = props => {
  const {
    onCancel,
    profile,
    pendingProfile,
    pendingPlaylist,
    createCollection,
    updateProfile
  } = props;
  const { t } = useTranslation();
  const id = 'create-playlist';

  return (
    <Formik
      initialValues={{
        _id: shortid.generate(),
        title: '',
        image: null
      }}
      validationSchema={schemaPlaylist}
      onSubmit={values => {
        createCollection(values);
        updateProfile(profile._id, { $push: { playlist: values._id } });
        if (!pendingProfile && !pendingPlaylist) onCancel();
      }}
    >
      <Form>
        <Box display="flex" flexDirection="column" alignItems="center">
          <FieldFileAvatar id={id} name="image" />
          <FieldText id={id} name="title" />
        </Box>
        <ErrorMessage name="image" />
        <ErrorMessage name="title" />
        <Box pb={1} pt={2} display="flex" justifyContent="flex-end">
          <Box mr={0.5}>
            <Button onClick={onCancel}>
              {t('cancel')}
            </Button>
          </Box>
          <Box ml={0.5}>
            <Button
              variant="contained"
              color="success"
              loading={pendingPlaylist || pendingProfile}
              type="submit"
            >
              {t('create')}
            </Button>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};

FormCreatePlaylist.propTypes = {
  onCancel: PropTypes.func.isRequired,
  profile: propUser.isRequired,
  pendingProfile: PropTypes.bool.isRequired,
  pendingPlaylist: PropTypes.bool.isRequired,
  createCollection: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  pendingProfile: state.profile.pending,
  pendingPlaylist: state.playlist.pending
});

const mapDispatchToProps = dispatch => ({
  createCollection: playlist => dispatch(createPlaylist(playlist)),
  updateProfile: (_id, modifier) => dispatch(updateUser(_id, modifier))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormCreatePlaylist);
