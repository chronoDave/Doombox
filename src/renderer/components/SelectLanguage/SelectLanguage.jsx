import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TYPES } from '../../../utils/types';
import { LANGUAGES } from '../../../intl/intl';
import { Select, LabelSelect } from '..';
import { updateConfig } from '../../actions';
import { useTranslation } from '../../hooks';

const SelectLanguage = ({ language }) => {
  const { t } = useTranslation();

  return (
    <LabelSelect label={t('title.display_language', { transform: 'capitalize' })}>
      <Select
        active={language}
        values={Object.entries(LANGUAGES).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: {
            value: key,
            primary: value
          }
        }), {})}
        onChange={(_, key) => updateConfig(TYPES.CONFIG.DISPLAY, { language: key })}
      />
    </LabelSelect>
  );
};

const mapStateToProps = state => ({
  language: state.config.display.language
});

SelectLanguage.propTypes = {
  language: PropTypes.oneOf(Object.keys(LANGUAGES)).isRequired
};

export default connect(
  mapStateToProps
)(SelectLanguage);
