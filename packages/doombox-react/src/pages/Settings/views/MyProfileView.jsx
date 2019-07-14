import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icon
import IconPerson from '@material-ui/icons/Person';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../../components/Typography';
import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { Divider } from '../../../components/Divider';
import {
  DialogUpdateProfile,
  DialogConfirmation
} from '../../../components/Dialog';

// Actions
import { deleteUser } from '../../../actions/userActions';

const MyProfileView = ({ user, deleteProfile, pending }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);

  return (
    <Fragment>
      <Box
        bgcolor="grey.500"
        border={1}
        borderRadius={8}
        borderColor="grey.600"
        p={2}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Avatar
          path={user.avatar ? user.avatar.path : null}
          fallback={<IconPerson />}
        />
        <Box pt={1}>
          <Typography variant="h6" align="center">
            {user.username}
          </Typography>
        </Box>
        <Divider mb={2} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          BoxProps={{ pb: 1.5 }}
          onClick={() => setOpen('updateProfile')}
        >
          {t('edit')}
        </Button>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={() => setOpen('deleteProfile')}
        >
          {t('title:deleteProfile')}
        </Button>
      </Box>
      <DialogUpdateProfile
        open={open === 'updateProfile'}
        onClose={() => setOpen(null)}
        onCancel={() => setOpen(null)}
        initialValues={user}
      />
      <DialogConfirmation
        open={open === 'deleteProfile'}
        onClose={() => setOpen(null)}
        onCancel={() => setOpen(null)}
        title="title:areYouSure"
        description="description:deleteProfile"
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteProfile(user._id)}
          disabled={pending}
        >
          {t('delete')}
        </Button>
      </DialogConfirmation>
    </Fragment>
  );
};

MyProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  pending: PropTypes.bool.isRequired,
  deleteProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.profile.user,
  pending: state.profile.pending
});

const mapDispatchToProps = dispatch => ({
  deleteProfile: id => dispatch(deleteUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfileView);
