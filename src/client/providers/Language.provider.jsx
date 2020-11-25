import React from 'react';
import { connect } from 'react-redux';
import { getTranslation, getNativeKeybind } from '@doombox-intl';
import PropTypes from 'prop-types';

// Context
import { LanguageContext } from '../context';

const LanguageProvider = ({ language, children }) => {
  const value = {
    language,
    getNativeKeybind,
    t: (id, options) => getTranslation(language, id, options)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  language: state.config.language
});

export default connect(
  mapStateToProps
)(LanguageProvider);
