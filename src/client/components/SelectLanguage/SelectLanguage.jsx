import React from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '@doombox-intl';
import PropTypes from 'prop-types';

// Core
import { Select } from '../Select';
import { MenuItem } from '../MenuItem';

// Actions
import { updateLanguage } from '../../actions';

const InputLanguage = ({ language }) => (
  <Select label={LANGUAGES[language]}>
    {Object.entries(LANGUAGES).map(([key, primary]) => (
      <MenuItem
        key={key}
        primary={primary}
        onClick={() => updateLanguage(key)}
      />
    ))}
  </Select>
);

const mapStateToProps = state => ({
  language: state.config.language
});

InputLanguage.propTypes = {
  language: PropTypes.oneOf(Object.keys(LANGUAGES)).isRequired
};

export default connect(
  mapStateToProps
)(InputLanguage);
