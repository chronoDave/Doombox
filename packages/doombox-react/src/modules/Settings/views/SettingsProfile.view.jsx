import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Core
import { Box } from '@material-ui/core';

import { FormUpdateProfile } from '../../../components/Form';
import { Avatar } from '../../../components/Avatar';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';

// Validation
import { propUser } from '../../../validation/propTypes';

const ProfileView = ({ user }) => {
  const [edit, setEdit] = useState(false);
  const { t } = useTranslation();

  return (
    <Box p={3}>
      {edit ? <FormUpdateProfile onCancel={() => setEdit(false)} /> : (
        <Box display="flex" alignItems="center">
          <Avatar size="large" id={user.avatar} />
          <Box
            display="flex"
            flexDirection="column"
            pl={3}
            flexGrow={1}
          >
            <Typography
              variant="caption"
              transform="uppercase"
              color="grey.200"
            >
              <strong>
                {t('username')}
              </strong>
            </Typography>
            <Typography paragraph>
              {user.username}
            </Typography>
            <Typography
              variant="caption"
              transform="uppercase"
              color="grey.200"
            >
              <strong>
                {t('language')}
              </strong>
            </Typography>
            <Typography>
              {t(user.language, { lng: user.language })}
            </Typography>
          </Box>
          <Button
            alignSelf="flex-start"
            onClick={() => setEdit(true)}
          >
            {t('edit')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

ProfileView.propTypes = {
  user: propUser.isRequired
};

const mapStateToProps = state => ({
  user: state.profile.user
});

export default connect(
  mapStateToProps
)(ProfileView);
