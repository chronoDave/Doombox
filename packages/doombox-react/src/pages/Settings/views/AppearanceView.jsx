import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icon
import IconImage from '@material-ui/icons/Image';

// Core
import {
  Box,
  IconButton,
  ButtonBase
} from '@material-ui/core';

import { Typography } from '../../../components/Typography';
import { FieldFileBase } from '../../../components/Field';
import { Button } from '../../../components/Button';

// Actions
import { updateUser } from '../../../actions/userActions';

const AppearanceView = props => {
  const {
    id,
    background,
    updateBackground,
    clearBackground,
    loading
  } = props;
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="button">
        {t('background')}
      </Typography>
      <FieldFileBase
        id="settings-appearance"
        name="background"
        type="image"
        validator={['png', 'jpg', 'jpeg', 'gif']}
        setFieldValue={(name, value) => updateBackground(id, { background: value })}
        render={({ onClick }) => (
          <Box
            bgcolor="grey.500"
            border={1}
            borderRadius={8}
            borderColor="grey.600"
            p={2}
            width="100%"
            display="flex"
            flexDirection="column"
          >
            <ButtonBase onClick={onClick}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minWidth={480}
                minHeight={360}
                bgcolor="grey.300"
                borderRadius={8}
              >
                {background ? (
                  <img
                    src={background.path}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    alt="User-selected Doombox background"
                  />
                ) : <IconImage fontSize="large" />}
              </Box>
            </ButtonBase>
            <Box pt={2} display="flex" justifyContent="flex-end">
              <Button
                disabled={loading}
                color={background ? 'error' : 'default'}
                variant={background ? 'contained' : 'text'}
                BoxProps={{ pl: 1 }}
                onClick={() => (background ? clearBackground(id) : onClick())}
              >
                {t(background ? 'remove' : 'add')}
              </Button>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

AppearanceView.propTypes = {
  id: PropTypes.string.isRequired,
  background: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  id: state.profile.user._id,
  background: state.profile.user.background,
  loading: state.profile.pending
});

const mapDispatchToProps = dispatch => ({
  updateBackground: (id, values) => dispatch(updateUser(id, values)),
  clearBackground: id => dispatch(updateUser(id, { background: null }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppearanceView);
