import React from 'react';
import { connect } from 'react-redux';
import { TYPES } from '@doombox-utils/types';
import { LANGUAGES } from '@doombox-intl';
import PropTypes from 'prop-types';

// Core
import { Select } from '../Select';
import { MenuItem } from '../MenuItem';

// Actions
import { updateConfig } from '../../actions';

const InputLanguage = ({ language }) => (
  <Select label={LANGUAGES[language]}>
    {Object.entries(LANGUAGES).map(([key, primary]) => (
      <MenuItem
        key={key}
        primary={primary}
        onClick={() => updateConfig(TYPES.CONFIG.DISPLAY, { language: key })}
      />
    ))}
  </Select>
);

const mapStateToProps = state => ({
  language: state.config.display.language
});

InputLanguage.propTypes = {
  language: PropTypes.oneOf(Object.keys(LANGUAGES)).isRequired
};

export default connect(
  mapStateToProps
)(InputLanguage);
