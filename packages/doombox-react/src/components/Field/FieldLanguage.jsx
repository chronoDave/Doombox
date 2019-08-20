import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icon
import IconTranslate from '@material-ui/icons/Translate';

// Core
import FieldSelect from './FieldSelect';

// Utils
import { languages } from '../../utils';
import i18n from '../../locale';

const FieldLanguage = ({ id }) => {
  const { t } = useTranslation();

  const options = () => languages.map(language => ({
    key: language,
    value: language,
    t: () => t(language, { lng: language })
  }));

  return (
    <FieldSelect
      id={id}
      name="language"
      options={options()}
      InputProps={{ startAdornment: <IconTranslate /> }}
      effect={event => i18n.changeLanguage(event.target.value)}
    />
  );
};

FieldLanguage.propTypes = {
  id: PropTypes.string.isRequired
};

export default FieldLanguage;
