import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icon
import IconImage from '@material-ui/icons/Image';

// Core
import {
  Box,
  Card,
  ButtonBase
} from '@material-ui/core';

import { Typography } from '../../../components/Typography';
import { FieldFileBase } from '../../../components/Field';
import { Button } from '../../../components/Button';

// Template
import { SettingsTemplate } from '../../templates';

// Actions
import { updateUser } from '../../../api/userApi';

// Validation
import { propImage } from '../../../validation/propTypes';

// Utils
import { normalizeUrl } from '../../../utils';

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
    <SettingsTemplate>
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
          <Card>
            <Box
              p={2}
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
                  borderRadius="borderRadius"
                >
                  {background ? (
                    <img
                      src={normalizeUrl(background.path)}
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
                  pl={1}
                  onClick={() => (background ? clearBackground(id) : onClick())}
                >
                  {t(background ? 'remove' : 'add')}
                </Button>
              </Box>
            </Box>
          </Card>
        )}
      />
    </SettingsTemplate>
  );
};

AppearanceView.propTypes = {
  id: PropTypes.string.isRequired,
  background: propImage,
  loading: PropTypes.bool.isRequired,
  updateBackground: PropTypes.func.isRequired,
  clearBackground: PropTypes.func.isRequired,
};

AppearanceView.defaultProps = {
  background: null
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
