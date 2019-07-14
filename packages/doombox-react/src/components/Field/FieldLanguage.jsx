import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  MenuItem,
  TextField,
} from '@material-ui/core';

import { IconFlag } from '../Icon';

// Language
import i18n from '../../locale';

// Utils
import { languages } from '../../utils'; 

// Styles
import FieldStyle from './FieldStyle';

const changeLanguage = lng => i18n.changeLanguage(lng);

const FieldLanguage = props => {
  const { id, classes, ...rest } = props;
  const { t } = useTranslation();

  return (
    <Field
      name="language"
      render={({
        field: { name, value },
        form: { setFieldValue, handleBlur }
      }) => (
        <Box width="100%" {...rest}>
          <TextField
            select
            label={t(name)}
            value={value}
            inputProps={{
              id: `${id}-${name}`,
              onBlur: handleBlur(name)
            }}
            SelectProps={{ classes: { selectMenu: classes.selectMenu } }}
            onChange={event => {
              // Language validation is not needed
              setFieldValue(name, event.target.value, false);
              changeLanguage(event.target.value);
            }}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {languages.map(lang => (
              <MenuItem
                key={lang}
                value={lang}
                classes={{ root: classes.menuItemRoot }}
              >
                <IconFlag country={lang} />
                {t(lang)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    />
  );
};

FieldLanguage.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(
  FieldStyle
)(FieldLanguage);
