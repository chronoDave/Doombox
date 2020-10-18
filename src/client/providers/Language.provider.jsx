import React from 'react';
import { connect } from 'react-redux';
import { getTranslation } from '@doombox-intl';
import PropTypes from 'prop-types';

// Hooks
import { LanguageContext } from '../hooks';

const LanguageProvider = ({ language, children }) => {
  const value = {
    language,
    t: id => getTranslation(language, id)
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
