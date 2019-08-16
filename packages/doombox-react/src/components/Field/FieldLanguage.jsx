import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';

// Icon
import IconTranslate from '@material-ui/icons/Translate';

// Core
import {
  Box,
  MenuItem,
  TextField,
} from '@material-ui/core';

// Language
import i18n from '../../locale';

// Utils
import { languages } from '../../utils';

// Styles
import { useFieldStyle } from './Field.style';

const FieldLanguage = ({ id, ...rest }) => {
  const classes = useFieldStyle();
  const { t } = useTranslation();

  return (
    <Field
      name="language"
      render={({
        field: { name, value },
        form: { setFieldValue }
      }) => (
        <Box width="100%" {...rest}>
          <TextField
            select
            label={t(name)}
            value={value}
            inputProps={{ id: `${id}-${name}` }}
            InputProps={{ startAdornment: <IconTranslate /> }}
            SelectProps={{ classes: { selectMenu: classes.selectMenu } }}
            onChange={event => {
              setFieldValue(name, event.target.value, false);
              i18n.changeLanguage(event.target.value);
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
                {t(lang, { lng: lang })}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    />
  );
};

FieldLanguage.propTypes = {
  id: PropTypes.string.isRequired
};

export default FieldLanguage;
