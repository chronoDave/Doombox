import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TYPES } from '../../../utils/types';
import { THEME } from '../../../config';
import { Select, LabelSelect } from '..';
import { updateConfig } from '../../actions';
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
