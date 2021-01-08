import React from 'react';
import { connect } from 'react-redux';
import { TYPES } from '@doombox-utils/types';
import { THEME } from '@doombox-config';
import PropTypes from 'prop-types';

// Core
import { Select } from '../Select';
import { LabelSelect } from '../LabelSelect';
import { MenuItem } from '../MenuItem';

// Actions
import { updateConfig } from '../../actions';

// Hooks
import { useTranslation } from '../../hooks';

const SelectTheme = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <LabelSelect label={t('description.select_theme', { transform: 'capitalize' })}>
      <Select label={t(`common.${theme}`, { transform: 'capitalize' })}>
        {Object.keys(THEME).map(key => (
          <MenuItem
            key={key}
            primary={t(`common.${key}`, { transform: 'capitalize' })}
            onClick={() => updateConfig(TYPES.CONFIG.DISPLAY, { theme: key })}
          />
        ))}
      </Select>
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
