import React from 'react';
import { connect } from 'react-redux';
import { TYPES } from '@doombox-utils/types';
import { THEME } from '@doombox-config';
import PropTypes from 'prop-types';

// Core
import { Select } from '../Select';
import { LabelSelect } from '../LabelSelect';

// Actions
import { updateConfig } from '../../actions';

// Hooks
import { useTranslation } from '../../hooks';

const SelectTheme = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <LabelSelect label={t('description.select_theme', { transform: 'capitalize' })}>
      <Select
        active={theme}
        values={Object.keys(THEME).reduce((acc, key) => ({
          ...acc,
          [key]: {
            value: key,
            primary: t(`common.${key}`, { transform: 'capitalize' })
          }
        }), {})}
        onChange={(_, value) => updateConfig(TYPES.CONFIG.DISPLAY, { theme: value })}
      />
    </LabelSelect>
  );
};

const mapStateToProps = state => ({
  theme: state.config.display.theme
});

SelectTheme.propTypes = {
  theme: PropTypes.oneOf(Object.keys(THEME)).isRequired
};

export default connect(
  mapStateToProps
)(SelectTheme);
