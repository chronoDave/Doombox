import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import { IconFlag } from '../../../components/Icon';

// Actions
import { updateUser } from '../../../actions/userActions';

// Utils
import { languages } from '../../../utils';

// Style
import SettingsPageStyle from '../SettingsPageStyle';

const LanguageView = props => {
  const {
    language,
    id,
    updateLanguage,
    classes
  } = props;
  const { t } = useTranslation();

  return (
    <Box
      bgcolor="grey.500"
      border={1}
      borderRadius={8}
      borderColor="grey.600"
      p={2}
      width="100%"
    >
      <List>
        {languages.map(lang => (
          <ListItem
            key={lang}
            className={language === lang ? classes.listLanguageSelected : null}
            button
            onClick={() => updateLanguage(id, { language: lang })}
          >
            <ListItemIcon>
              <IconFlag country={lang} />
            </ListItemIcon>
            <ListItemText primary={t(lang)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

LanguageView.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
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
)(withStyles(
  SettingsPageStyle
)(LanguageView));
