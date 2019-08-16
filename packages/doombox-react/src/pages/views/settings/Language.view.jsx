import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import {
  Card,
  Box
} from '@material-ui/core';

import { List } from '../../../components/List';

// Template
import { SettingsTemplate } from '../../templates';

// Actions
import { updateUser } from '../../../api/userApi';

// Utils
import { languages } from '../../../utils';
import i18n from '../../../locale';

const LanguageView = props => {
  const {
    language,
    id,
    updateLanguage
  } = props;

  const items = languages.map(lng => ({
    key: lng,
    tProps: { lng },
    onClick: () => {
      updateLanguage(id, { language: lng });
      i18n.changeLanguage(lng);
    }
  }));

  return (
    <SettingsTemplate>
      <Card>
        <Box px={2} py={1}>
          <List active={language} items={items} />
        </Box>
      </Card>
    </SettingsTemplate>
  );
};

LanguageView.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  id: state.profile.user._id,
  language: state.profile.user.language
});

const mapDispatchToProps = dispatch => ({
  updateLanguage: (id, values) => dispatch(updateUser(id, values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageView);
