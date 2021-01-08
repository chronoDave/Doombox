import React from 'react';
import { connect } from 'react-redux';
import { TYPES } from '@doombox-utils/types';
import { LANGUAGES } from '@doombox-intl';
import PropTypes from 'prop-types';

// Core
import { Select } from '../Select';
import { LabelSelect } from '../LabelSelect';
import { MenuItem } from '../MenuItem';

// Actions
import { updateConfig } from '../../actions';

// Hooks
import { useTranslation } from '../../hooks';

const SelectLanguage = ({ language }) => {
  const { t } = useTranslation();

  return (
    <LabelSelect label={t('description.display_language', { transform: 'capitalize' })}>
      <Select label={LANGUAGES[language]}>
        {Object.entries(LANGUAGES).map(([key, primary]) => (
          <MenuItem
            key={key}
            primary={primary}
            onClick={() => updateConfig(TYPES.CONFIG.DISPLAY, { language: key })}
          />
        ))}
      </Select>
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